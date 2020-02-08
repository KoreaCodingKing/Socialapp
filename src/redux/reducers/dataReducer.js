import { 
    SET_SCREAMS, 
    LIKE_SCREAM, 
    UNLIKE_SCREAM, 
    LOADING_DATA, 
    DELETE_SCREAM, 
    POST_SCREAM, 
    SET_SCREAM,
    SUBMIT_COMMENT
} from '../types';

const initialState = {
    screams: [],
    scream: {},
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_SCREAMS:
            return{
                ...state,
                screams: action.payload,
                loading: false
            };
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload
            };
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            if(state.scream.screamId === action.payload.screamId){
                state.scream = action.payload; 
            }
            return {
                ...state
            };
        case DELETE_SCREAM:
            // action을 통해 받은 screamId와 현재 scream의 screamId를 비교하고 같으면 index에 findindex한 값을  저장
            index = state.screams.findIndex((scream) => scream.screamId === action.payload);
            // 현재 state에 screams의 인덱스부터 첫번째, 즉 자기자신만 꺼냄
            state.screams.splice(index, 1);
            return {
                ...state
            };
        case POST_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            };
        // spread state해서 현재의 scraem안의 comments에 action의 payload로 받은 comment를 현재의 scream에 넣는다.
        case SUBMIT_COMMENT:
            return {
                ...state,
                scream: {
                    ...state.screams,
                    comments: [
                        action.payload, 
                        ...state.scream.comments
                    ]
                }
            };
        default: 
            return state;
    }
}