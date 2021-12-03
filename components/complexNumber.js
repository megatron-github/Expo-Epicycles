/*Complex numers*/
class ComplexNumber {
    constructor(real, imagine) {
        this.re = real;
        this.im = imagine;
    }
    add(other) {
        const re = this.re + other.re;
        const im = this.im + other.im;
        return new ComplexNumber(re, im);
    }
    substract(other) {
        const re = this.re - other.re;
        const im = this.im - other.im;
        return new ComplexNumber(re, im);
    }
    multiply(other) {
        const re = (this.re * other.re) - (this.im * other.im);
        const im = (this.re * other.im) + (this.im * other.re);
        return new ComplexNumber(re, im);
    }
    divide(other) {
        const denominator = (other.re * other.re) + (other.im * other.im);
        const re = ((this.re * other.re) + (this.im * other.im)) / denominator;
        const im = ((this.im * other.re) - (this.re * other.im)) / denominator;
        return new ComplexNumber(re, im);
    }
}
export { ComplexNumber };