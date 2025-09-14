/*
* This is a Crash game bot
*
* instagram.enfjar_majid 
*/

if (typeof game_busted !== "function" || typeof game_waiting !== "function") close();

var _50Flg_ = false;
var oContainer = new Array(0);
var f_game_busted = game_busted;
var f_game_waiting = game_waiting;

$('div.bet-widget').after("<a style='font-weight: 500;display: inline-block;line-height: 150%;padding: 10px 0px;border-radius: 60px;background: #ffffff;margin-top: 20px;font-size: 22px;color: #265105;text-decoration: none;border-bottom: 3px solid #ffffff;width: 90%;white-space: nowrap;overflow: auto;text-overflow: ellipsis;' class='top-link'><h4 id='hadi-box'></h4></a>");

game_waiting = (function () {
    return function (str) {

        f_game_waiting.apply(this, arguments);

        __init50Hss__();
        
        var result = getAlgorithNumberHash(str.md5);

        document.getElementsByClassName('cashout-amount')[0].value = parseFloat(result);
       
        $("h4#hadi-box").html("<b>" + result + "</b>");
    };
}());

game_busted = (function () {
    return function (str) {

        __init50Hss__();
        addToRepository(str);

        $("h4#hadi-box").html("");
        f_game_busted.apply(this, arguments); 
    };
}());

function __init50Hss__() {

    if (!_50Flg_) {

        _50Flg_ = true;

        var _50LatestHash_ = document.getElementsByClassName('crash-row');

        for(var i = _50LatestHash_.length-1; i >= 1; i--) {

            var amount = parseFloat(_50LatestHash_[i].getElementsByClassName('h-col-1')[0].textContent) * 100;
            var md5 = _50LatestHash_[i].getElementsByClassName('h-col-5')[0].textContent;
            var hash = _50LatestHash_[i].getElementsByClassName('h-col-6')[0].textContent;

            addToRepository(new Object({
                "amount" : amount,
                "md5" : md5,
                "hash" : hash
            }));
        }
    }
}

function addToRepository(str) {

    oContainer.push(new Object({
        "amount" : str.amount ? str.amount / 100 : getHashObject(str.hash).amount,
        "md5" : str.md5,
        "hash" : str.hash,
        "_v" : getHashObject(str.md5)
    }));
}

function getHashObject(md5) {

    var hashValueNumebr = getHashValueNumebr(md5, 13);

    var hashValue = (1 + 0.99 * hashValueNumebr / (4503599627370496 - hashValueNumebr));

    return new Object({
        "amount" : parseFloat(hashValue.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]),
        "_math" : hashValueNumebr
    });
}

function getHashValueNumebr(str, pos) {

    var mathLevel = parseInt(str.slice(pos - 1, pos), 16) * Math.pow(16, -(pos-13));
    
    if (pos == 1) {
        return mathLevel;
    }

    return mathLevel + getHashValueNumebr(str, pos-1);
}

function getCategoryValue(arr, amount) {

    var selectedItems = new Array(0);

    for(var i = arr.length-1; i >= 0; i--) {
        
        if (parseInt(arr[i]._v.amount) == parseInt(amount)) {

            selectedItems.push(arr[i]);
        }
    }

    /*return getSortedListBy(getSortedListBy(selectedItems,  function(obj) {

        return obj.md5;
    }), function (obj) { return obj._v._math });*/

    return selectedItems;
}

function getAlgorithNumberHash(md5) {

    return getCalculatedNum(getCategoryValue(oContainer, getHashObject(md5).amount), 5);
}

function getCalculatedNum(arr, num) {

    if (arr.length <= 0) {
        arr = oContainer;
    } else if(arr.length < num) {
        var new_arr = new Array(0);

        for (var i = 0; i <= arr.length-1; i++) {
            new_arr.push(arr[i].amount);
        }

        var countFromContainer = (num - arr.length) - 1;

        if (countFromContainer >= 0) {
            for (var i = 0; i <= countFromContainer; i++) {
                new_arr.push(oContainer[i].amount);
            }
        }

        arr = new_arr;
    }

    var nums = new Array(0);

    for (var i = 0; i <= arr.length-1; i++) {

        nums.push(arr[i].amount);
    }

    var min = Math.min(...nums);
 $aaa = 'اتصال به سرور ضعیف هست';
    return ($aaa);

}

function getSortedListBy(list, callable) {

     var sort = function (propertyRetriever, arr) {
        arr.sort(function (a, b) {
            var valueA = propertyRetriever(a);
            var valueB = propertyRetriever(b);
    
            if (valueA < valueB) {
                return -1;
            } else if (valueA > valueB) {
                return 1;
            } else {
                return 0;
            }
        });
    };

    sort(callable, list);

    return list;
}

function doPlay(amount, cashout) {

    document.getElementsByClassName('cashout-amount')[0].value = cashout;
    document.getElementsByClassName('game-amount')[0].value = amount;
    document.getElementsByClassName("place-bet")[0].click();
}
