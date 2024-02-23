App = {
  web3Provider: null,
  contracts: {},
  account: "0x0",

  init: async function() {
    await App.initWeb3();
    await App.initContract();
    App.render();
  },

  initWeb3: async function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by MetaMask
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify the default instance if no web3 instance provided 
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
      web3 = new Web3(App.web3Provider);
    }
  },

  initContract: async function() {
    return new Promise(function(resolve, reject) {
      $.getJSON("Contest.json", function(contest) {
        // Instantiate a new Truffle contract from the artifact
        App.contracts.Contest = TruffleContract(contest);
        // Connect provider to interact with the contract
        App.contracts.Contest.setProvider(App.web3Provider);
        resolve();
      }).fail(function(error) {
        console.error(error);
        reject(error);
      });

    });
  },

  //Listen for events emitted from the contract
  listenForEvents: function(){
    App.contracts.Contest.deployed().then(function(instance){
    instance.votedEvent({}, {
    fromBlock: 0,
    toblock: 'latest'
  }).watch(function(error, event) {
    console.log("event triggered", event)
    //reload when a new vote is recorded
    App.render();
  });
});  
},

  render: async function() {
    var contestantInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    loader.hide();

    // Load account data
    web3.eth.getCoinbase(function (err, account) {
      if(err === null){
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    try {
      // Load contract data
      contestantInstance = await App.contracts.Contest.deployed();
      var contestantCount = await contestantInstance.contestantCount();
      var contestantsResults = $("#contestantsResults");
      contestantsResults.empty();
      var contestantsSelect = $("#contestantsSelect");
      contestantsSelect.empty();

      for (var i = 1; i <= contestantCount; i++) {
        (function (index) { // Use a closure to capture the correct index value
          contestantInstance.contestants(index).then(function (contestant) {
            var id = contestant[0];
            var name = contestant[1];
            var voteCount = contestant[2];

            // Render contestant result
            var contestantTemplate = "<tr><th scope='row'>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>";
            contestantsResults.append(contestantTemplate);

            // Render candidate voting option
            var contestantOption = "<option value='" + id + "' >" + name + "</ option>" 
            contestantsSelect.append(contestantOption);
          });
        })(i);
      }
    } catch (error) {
      console.warn(error);
    }

    loader.hide();
    loader.show();
  },
  castVote: function(){
    var contestantId = $('#contestantsSelect').val();
    App.contracts.Contest.deployed().then(function(instance){
      return instance.vote(contestantId, {from: App.account });
  }).then(function(result){
    //Wait for votes to update
    $("#content").hide();
    $("#loader").show();   
  }).catch(function(err){
    console.error(err);
  });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
