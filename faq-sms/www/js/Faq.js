
let myfuncB = (that) => {
    that.typeOfMsg = 'loading'
    that.loading = "Loading... ";
    that.btnFaqDisabled = true;
    that.$http
        .get(
            "https://api.coupocket.com/static-content/21,22,23,24,10,26,25,7,8,9,11/bulk"
        )
        .then(
            function (response) {
                console.log(response.data);
                that.typeOfMsg = 'faqDataReceived';
                that.faqdetails = response.data.data;
                that.btnFaqDisabled = false;
            },
            function (error) {
                alert('An error has occured please try after some time ' + error.data);
                that.btnFaqDisabled = false;
                that.loading = "FAQ not available at this moment . ";
            }
        );
};

var xport = {
    myfuncB: myfuncB,
};

module.exports = {
    xport
}
