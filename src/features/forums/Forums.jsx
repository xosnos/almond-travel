import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
} from 'react-bootstrap';
import { states } from './states';
import {
  fetchForums,
  addForum,
} from './forumsAPI';

export const Forums = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const forums = useSelector(state => state.forums);
  const state = location.pathname.split('/')[2].replaceAll('%20', ' ');
  useEffect(() => {
    dispatch(fetchForums(state));
  }, [dispatch, state]);
    


  return (
    <>
      <h1>Forums by State</h1>
    </>
  );
}