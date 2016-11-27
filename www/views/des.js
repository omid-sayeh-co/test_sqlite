test_DES.des = function (params) {
    "use strict";
      
    var viewModel = {
        open: function (event) {
            alert("asdff");
            var input = event.target;

            var reader = new FileReader();
            reader.onload = function (e) {
                var text = e.target.result;
                var node = document.getElementById('output');
                node.innerText = text;
                console.log(reader.result.substring(0, 200));
            };
            reader.readAsText(input.files[0]);
        }
    };

    return viewModel;
};