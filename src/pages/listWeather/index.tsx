import React from 'react';
import ListWeather from '../../components/ogranisms/ListWeather/List/ListWeather';
import { useParams } from 'react-router-dom';


export default function ListToday() {
  const { today } = useParams();
  return (
    <>
      <ListWeather today={today}></ListWeather>
    </>
  );
}
