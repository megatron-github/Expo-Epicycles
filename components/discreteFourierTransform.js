/** Discrete Fourier Transform alogrithm
 * transform a sequence of N complex numbers x_n 
 * into a sequence of complex numbers X_k 
**/
import { ComplexNumber } from './complexNumber.js';

class FourierTransform {
    constructor() {
        this.transformed = [];
    }
    transform(X) {
        const N = X.length;
        for (let k = 0; k < N; k++) {
            let sum = new ComplexNumber(0, 0);
            for (let n = 0; n < N; n++) {
                const theta = (2 * Math.PI * k * n) / N;
                const angleSum = new ComplexNumber(Math.cos(theta), 
                                                   -Math.sin(theta));
                sum = sum.add(X[n].multiply(angleSum));
        }
        sum = sum.divide(new ComplexNumber(N, 0));
        this.transformed[k] = { // an enhance object literal
                re: sum.re,
                im: sum.im, 
                freq: k, 
                amp: Math.sqrt(sum.re * sum.re + sum.im * sum.im), 
                phase: Math.atan2(sum.im, sum.re)
            };
        }
        this.transformed.sort((a, b) => b.amp - a.amp);
    }   
    epicycles = function(p, x, y, rotation, time) {
        for (let i = 0; i < this.transformed.length; i++) {
            // location of each cycle (center of each circle)
            const prevx = x;
            const prevy = y;
            const freq = this.transformed[i].freq;
            const radius = this.transformed[i].amp;
            const phase = this.transformed[i].phase;
            // location where the circle circumference
            x += 3 * radius * Math.cos(freq * time + phase + rotation);
            y += 3 * radius * Math.sin(freq * time + phase + rotation);
            // draw each epicycle
            p.stroke(214, 186, 139, 150);
            p.strokeWeight(2);
            p.noFill();
            p.ellipse(prevx, prevy, 6*radius, 6*radius);
            p.line(prevx, prevy, x, y);
        }
        return new p.PVector(x, y);
    }
    reset() {
        this.transformed = [];
    }
}
export { FourierTransform }; 