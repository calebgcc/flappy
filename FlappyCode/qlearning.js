// Implementation of Q-learning model
var qTable = {}
var qAction = {FALL:0, JUMP:1};
var alpha = 0.1; // learning rate
var gamma = 0.8; // discount
var buffer = []; // save state and action of recent episode
var trials = 0;
var episodeFrame = 0;
var targetTube = 0;

function getQ(state, action){
    var record = [state.dfy, state.speedy, state.tubex, action];
    if(!(record in qTable)){
        return 0;
    } 
    return qTable[record];
}

function setQ(state, action, reward){
    var record = [state.dfy, state.speedy, state.tubex, action];
    if(!(record in qTable)){
        qTable[record] = 0;
    }
    qTable[record] += reward;
}

function getAction(state){
    // explore env
    var explore = Math.ceil(Math.random()*100000)%90001;
    if(explore == 0){
        var jump = (((Math.random()*100)%4)==0);
        if(jump){
            return qAction.FALL;
        }
        return qAction.JUMP;
    }

    // exploit env
    var rewardJUMP = getQ(state,qAction.JUMP);
    var rewardFALL = getQ(state,qAction.FALL);
    if(rewardFALL > rewardJUMP){
        return qAction.FALL;
    }
    else if(rewardJUMP > rewardFALL){
        return qAction.JUMP;
    }
    else{
        var jump = (Math.ceil((Math.random()*100)%2)==0);
        if(jump){
            return qAction.JUMP;
        }
        return qAction.FALL;
    }
}

function doReward(reward, goodJob){
    var theta = 1; // deviation from the right position that can be tolerated
    var minFrameSize = 5;
    var frameSize = Math.max(minFrameSize,episodeFrame);

    for(var i =buffer.length-2; i>=0 && frameSize > 0; i--){ // start iteration from the most recent
        var state = buffer[i].env;
        var action = buffer[i].action;

        var rewardState = (reward - Math.abs(state.dfy));

        if(!goodJob){
            if(state.dfy >= theta && action == qAction.JUMP){
                rewardState = -rewardState;
            } 
            else if(state.dfy <= -theta && action == qAction.FALL){
                rewardState = -rewardState;
            } 
            else{
                rewardState = +0.5;
            }
        }
        
        var futureState = buffer[i+1].env;
        var optimalFuture = Math.max(
            getQ(futureState,qAction.JUMP),
            getQ(futureState,qAction.FALL)
        );
        var update = alpha*(rewardState + gamma * optimalFuture - getQ(state,action));
        setQ(state,action,update);
        frameSize--;
    } // end for

    buffer = buffer.slice(Math.max(buffer.length - minFrameSize, 1));
    episodeFrame = 0;
}

function triggerGameOver(){
    doReward(100, false);
    console.log("GAME OVER:",Object.keys(qTable).length,trials++);
    episodeFrame = 0;
}

