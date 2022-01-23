import React from 'react';
import './trainingPlan.sass';

export default function TrainingPlan() {



    return (
        <div className="training">
            <div className="timer">
                <div className="training__buttons">
                    <button className="timer__addPause">
                        Добавить перерыв
                    </button>
                    <button className="timer__addExersise">
                        Добавить подход
                    </button>
                </div>
            </div>
        </div>
    )
}
