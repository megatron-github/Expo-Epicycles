import React from 'react';
import { Dimensions, PanResponder } from 'react-native';
import { ProcessingView } from 'expo-processing';
import { ComplexNumber } from './components/complexNumber.js';
import { FourierTransform } from './components/discreteFourierTransform.js';

export default function App() {

    /**
     * Global
     */
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    // user interaction variables
    const FOURIER = 1;
    let state = -1;
    // data processing variables
    let drawing = [];                   
    let fourierX = new FourierTransform;
    // animation processing variables
    let time = 0;
    let path = [];
    let firstAnimation = true;
    /**
     * Event Handler: allow users to draw on screen
     */
    const panResponder = React.useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
            },
            onPanResponderStart: (evt, gestureState) => {
                state = !FOURIER;
                drawing = [];
                time = 0;
                fourierX.reset();
                firstAnimation = true;
            }, 
            onPanResponderMove: (evt, gestureState) => {
                drawing.push(
                    new ComplexNumber(gestureState.moveX - windowWidth / 2, 
                                      gestureState.moveY - windowHeight / 2)
                );
            },
            onPanResponderEnd: (evt, gestureState) => {
                state = FOURIER;
                fourierX.transform(drawing);
            },
        })
    ).current;
    /**
     * Processing.js: allow the drawing of Fourier Transform Epicycles
     */
    function sketch(p) {

        p.setup = function() {}
        p.draw = function() {
            p.background(0);
            if (state == FOURIER) {
                processDrawing();
            }
        }
        processDrawing = function() {
            // the amount of time we move each frame of animation
            const dt = 2 * Math.PI / fourierX.transformed.length;
            time += dt;
            // vectors that the epicyles pointed to
            let vect = fourierX.epicycles(p, 
                                          3 * windowWidth / 2, 
                                          3 * windowHeight / 2, 
                                          0, 
                                          time);
            // save all the vectors                     
            path.unshift(vect);
            // begin animation
            p.strokeWeight(6);
            p.beginShape();
            if (firstAnimation) {     // bugs fix
                p.noStroke();
            } else {
                p.stroke(0, 47, 134);
            }
            p.noFill();
            // color all the pixels that the epicyles pointed at
            for (let i = 0; i < path.length; i++) {
                p.vertex(path[i].x, path[i].y);
            }
            p.endShape();
            // loop the animation
            if (time > 2 * Math.PI) {
                time = 0;
                path = [];
                firstAnimation = false;
            }
        }
    }
    return (
        <ProcessingView style={{flex: 1}}
                        sketch={sketch}
                        {...panResponder.panHandlers}
        />
    );
}