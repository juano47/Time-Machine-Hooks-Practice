import React, { useEffect, useRef, useState } from 'react';
import './grid.css';
import { useTimeMachine } from '../../customHooks/useTimeMachine';
import { Colors } from '../../constants/colors';

function Grid() {
  const [current, setCurrent] = useState<number>();
  const [currentPosition, sizeValuesStored, getPreviousValue] = useTimeMachine(current);
  const inputRef = useRef<HTMLDivElement[]>([]);
  const [isPreviousButtonDisabled, setPreviousButtonDisabled] = useState(true);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [isClickDivAllowed, setClickDivAllowed] = useState(true);
  const [isResumeButtonDisabled, setResumeDisabled] = useState(true);

  useEffect(() => {
    console.log('currentPosition', currentPosition);
    console.log('sizeValuesStored', sizeValuesStored);
    if (currentPosition  <= 0) {
      setPreviousButtonDisabled(true);
    } else {
      setPreviousButtonDisabled(false);
    }

    if ((sizeValuesStored - currentPosition) <= 1) {
      setNextButtonDisabled(true);
      setResumeDisabled(true);
      setClickDivAllowed(true);
    } else {
      setNextButtonDisabled(false);
      setResumeDisabled(false);
      setClickDivAllowed(false);
    }
  }, [currentPosition]);

  function updateStyle(divNumber: number) {
    //update div style
    inputRef.current[divNumber].style.border = 'solid 1px #000';
    inputRef.current[divNumber].style.backgroundColor = '#fff';

    for (let i = 1; i < inputRef.current.length; i++) {
      if (i !== divNumber) {
        inputRef.current[i].style.border = 'none';
        inputRef.current[i].style.backgroundColor = Colors[i - 1];
      }
    }
  }

  function clickDiv(divNumber: number) {
    if (isClickDivAllowed) {
      setCurrent(divNumber);
      updateStyle(divNumber);
    }
  }

  function onClickAction(action: string) {
    updateStyle(getPreviousValue(action));

    if (action === 'previous') {

    } else if (action === 'resume') {
      setClickDivAllowed(true);
    }

  }

  //render a grid of 4x4 squares
  return (
    <div className='container'>
        <div className='grid'>
          <div className='cell' id='cell-1'
               onClick={() => clickDiv(1)}
               ref={el => inputRef.current[1] = el as HTMLDivElement} />
          <div className='cell' id='cell-2'
               onClick={() => clickDiv(2)}
               ref={el => inputRef.current[2] = el as HTMLDivElement} />
          <div className='cell' id='cell-3'
               onClick={() => clickDiv(3)}
               ref={el => inputRef.current[3] = el as HTMLDivElement} />
          <div className='cell' id='cell-4'
               onClick={() => clickDiv(4)}
               ref={el => inputRef.current[4] = el as HTMLDivElement} />
          <div className='cell' id='cell-5'
               onClick={() => clickDiv(5)}
               ref={el => inputRef.current[5] = el as HTMLDivElement} />
          <div className='cell' id='cell-6'
               onClick={() => clickDiv(6)}
               ref={el => inputRef.current[6] = el as HTMLDivElement} />
          <div className='cell' id='cell-7'
               onClick={() => clickDiv(7)}
               ref={el => inputRef.current[7] = el as HTMLDivElement} />
          <div className='cell' id='cell-8'
               onClick={() => clickDiv(8)}
               ref={el => inputRef.current[8] = el as HTMLDivElement} />
          <div className='cell' id='cell-9'
               onClick={() => clickDiv(9)}
               ref={el => inputRef.current[9] = el as HTMLDivElement} />
        </div>
        <div className='sidebar'>
          <button
            onClick={() => onClickAction('previous')}
            disabled={isPreviousButtonDisabled}
          >
            Previous
          </button>
          <button
            onClick={() => onClickAction('next')}
            disabled={isNextButtonDisabled}
          >
            Next
          </button>
          <button
            onClick={() => onClickAction('resume')}
            disabled={isResumeButtonDisabled}
          >
            Resume
          </button>
        </div>
    </div>

  );
}

export default Grid;