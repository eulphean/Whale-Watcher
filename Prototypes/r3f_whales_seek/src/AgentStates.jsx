import { State } from 'yuka';

const INSIDE = 'INSIDE';
const OUTSIDE = 'OUTSIDE';

class InsideState extends State {
	stateDuration = 0; 
	enter(agent) {
		// Time for this tate.
		this.stateDuration = 10; 
		// Choose an internal position.
		agent.setSeekTarget('internal');
	}

	execute(agent) {
		if (agent.currentTime >= this.stateDuration) {
			agent.chooseNextState();
			agent.currentTime = 0; 
		}
	}

	exit(agent) {
		// No cleanup
	}
}

class OutsideState extends State {
	stateDuration = 0; 
	enter(agent) {
		this.stateDuration = 30;
		agent.setSeekTarget('external');
	}

	execute(agent) {
		if (agent.currentTime >= this.stateDuration) {
			agent.chooseNextState();
			agent.currentTime = 0; 
		}
	}

	exit(agent) {
		// No cleanup
	}

}

export {
	InsideState,
	OutsideState
};
