import React, {useContext, useState, useEffect} from 'rect'
import {useHistory} from 'react-router-dom'
import {auth} from '../firebase';

const AuthContext = React.createContext();

export const useAuth = ()=> useContext(AuthContext);