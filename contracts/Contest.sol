pragma solidity 0.5.16;

contract Contest{
	//creating a structure to model the contestant
	struct Contestant{
		uint id;
		string name;
		uint voteCount;
	}
	//use mapping to keep track of contestant details
	mapping(uint => Contestant) public contestants;

	//to save the list of users/accounts who already casted vote
	mapping(address => bool) public voters;

	//add a public state variable to keep track of contestant count
	uint public contestantCount;

	event votedEvent(
		uint indexed _contestantId
		);

	constructor()public {
		addContestant("Tom");
		addContestant("Jerry");
	}

	function addContestant(string memory _name)private{
		contestantCount++;
		contestants[contestantCount] = Contestant(contestantCount, _name, 0);
	}

	function vote(uint _contestantId)public{
		//restricting the person who already casted the vote
		require(!voters[msg.sender]);
		//require that the vote is casted to a valid contestant
		require(_contestantId > 0 && _contestantId <= contestantCount);
		//increase the contestant vote count
		contestants[_contestantId].voteCount++;
		//set the voter's voted status to true
		voters[msg.sender] = true;

		//trigger the vote event
		emit votedEvent(_contestantId);
	}


}