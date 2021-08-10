
// this (vue instance) is passed as that , so we
// can read and write data from and to it as we please :)
let myfuncA = (that) => {
  if (cordova.platformId.toUpperCase() === "ANDROID") {
    androidDeviceSmsHandler(that);
  }
  else if (cordova.platformId.toUpperCase() === "IOS") {
    iosDeviceSmsHandler();
  }
 
};

//sms recive function start from here 
let androidDeviceSmsHandler = (that) => {
  SMSReceive.startWatch(function (response) {
    successSMSReceiveStartWatchCallback(response, that)
  }, function (error) {
    failureSMSReceiveStartWatchCallback(error, that)
  });
};


//if success then this function will for sms recive
let successSMSReceiveStartWatchCallback = (response, that) => {
  that.btnDisabled = true;
  that.typeOfMsg = 'timerMsg';
  /* Initialize incoming SMS event listener */
  let timesRun = 0;
  let interval = setInterval(function () {
    timesRun += 1;
    that.remainingTime = timesRun;
    if (timesRun === 40) {
      that.typeOfMsg = 'initialMsg';
      that.message = "No Message Received";
      clearInterval(interval);
      stopWatchGoingToStop();
    }
    console.log(timesRun);
  }, 1000);

  document.addEventListener('onSMSArrive', function (e) {
    console.log('onSMSArrive()');
    var IncomingSMS = e.data;
    console.log(JSON.stringify(IncomingSMS));
    console.log('sms.address:' + IncomingSMS.address);
    console.log('sms.body:' + IncomingSMS.body);
    //clear interval immediately once message has been received
    clearInterval(interval);
    whenSmsReceivedThenStopSmsWatch(IncomingSMS, that);
  });


};


//if failure then this function will for sms recive
let failureSMSReceiveStartWatchCallback = (error, that) => {
  that.typeOfMsg = 'initialMsg';
  that.message = `Unfortunately we have not listen any sms at this moment. Requesting you to tap on Get Token`

};


//if after succes to stop sms watch 
let whenSmsReceivedThenStopSmsWatch = (IncomingSMS, that) => {
  let incomingSmsBody = IncomingSMS.body;
  that.btnDisabled = false;
  if (incomingSmsBody && incomingSmsBody.indexOf('2FA') != -1) {
    that.token = getTokenFromSmsBody(IncomingSMS.body, "Token");
    that.typeOfMsg = 'tokenReceivedMsg';
    stopWatchGoingToStop();
  }

}

// sms stop watch function begin from here 
let stopWatchGoingToStop = () => {
  SMSReceive.stopWatch(successSMSReceiveStopWatchCallback, failureSMSReceiveStopWatchCallback);
}

//it will tell whether stop watch is sucsses to stop or not 
let successSMSReceiveStopWatchCallback = () => {
  console.log('smsreceive: watching stopped');
}

//it will tell whether stop watch is sucsses to stop or not 
let failureSMSReceiveStopWatchCallback = () => {
  console.warn('smsreceive: failed to stop watching');
}

//from sms  recieved  , it will return back only token 
let getTokenFromSmsBody = (str, word) => {
  let regex = new RegExp('\\b' + word + '\\b');
  let positionOfToken = str.search(regex);
  let newToken = str.substring((positionOfToken + 15), positionOfToken);
  return newToken.slice(7);
}

let iosDeviceSmsHandler = (that) =>{
//need to work on this 
}

//exprt the function 
var xport = {
  myfuncA: myfuncA
};

module.exports = {
  xport
}