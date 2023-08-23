import userReducer from "./UserReducer";
import React, { useEffect, useState } from 'react';
// @ts-ignore
import { combineReducers } from "redux";
const mainReducer = combineReducers({
    'user': userReducer,
})


export default mainReducer