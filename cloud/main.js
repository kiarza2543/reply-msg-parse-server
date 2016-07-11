
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('getReplyMsg', function(request, response) {
                   var MSG = Parse.Object.extend("Message");
                   var query = new Parse.Query(MSG);
                   var msgFromUser = request.params.msg;
                   console.log("request:"+request.params["msg"]);
                   console.log("msg from user:"+msgFromUser);
                   query.equalTo("msg", msgFromUser);
                   query.find({
                             success: function(msgResponse) {
                             var contents = [];
                             contents = msgResponse[0].get("replyMsg");
                             console.log("msgResponse:"+msgResponse);
                             console.log("contents:"+contents);
                             var replyCount = contents.length;
                             console.log("replyCount:"+replyCount);
                             if (replyCount == 0) {
                               response.success({"msg":msgFromUser,"replyMsg":""});
                               console.log("resultReplyMsg:"+"0");
                             }else {
                               var randomIndex = Math.floor((Math.random() * replyCount) + 0);
                               console.log("randomIndex:"+randomIndex);
                               var resultReplyMsg = contents[randomIndex].toString();
                               response.success({"msg":msgFromUser,"replyMsg":resultReplyMsg});
                               console.log("resultReplyMsg:"+resultReplyMsg);
                             }
                             //response.success(msgResponse);
                             },
                             error: function() {
                             response.error("get replyMsg failed");
                             }
      });
});
