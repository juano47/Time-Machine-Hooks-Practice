import React, { useEffect, useRef } from 'react';

export const useTimeMachine = (stateToKeepTrack: number | undefined) => {
  //create list of states to keep track of
  const [position, setPosition] = React.useState<number>(0);
  const states = useRef<number[]>([]);
  useEffect(() => {
    console.log('stateToKeepTrack', stateToKeepTrack);
    console.log('states.current previous', states.current);
    if (stateToKeepTrack !== undefined) {
      states.current = ([...states.current, stateToKeepTrack!]);
    }
    //update position to last state tracked
    console.log('states.current after', states.current);
    console.log('position previous', position);
    setPosition(states.current.length - 1);
    console.log('position after', position);
  }, [stateToKeepTrack]);

  const getValueInTimeN = (action: string) : number => {
    let newPosition;
    if (action === 'previous') {
      newPosition = position - 1;
      setPosition(newPosition);
    } else if (action === 'next') {
      newPosition = position + 1;
      setPosition(newPosition);
    }else {
      //update position to last state tracked
      newPosition = states.current.length - 1;
      setPosition(newPosition);
    }
    return states.current[newPosition];
  }

  return [position, states.current.length, getValueInTimeN] as [number, number, Function];
}