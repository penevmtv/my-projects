import { StringBuilder } from "../class-string-builder.js";
import { expect } from "chai";

describe('StringBuilder', function () {
    describe('Class definition', function () {
        it('should be a class (function)', () => {
            expect(typeof (StringBuilder)).to.equal('function');
        });

        it('should be instantiable with new', () => {
            const myString = new StringBuilder('test');
            expect(myString).to.be.instanceOf(StringBuilder);
        });

        it('should throw TypeError when called without new', () => {
            expect(() => StringBuilder('test')).to.throw(TypeError);
        });
    });

    describe('Constructor', function () {
        it('should create empty instance without arguments', () => {
            const sb = new StringBuilder();
            expect(sb._stringArray).to.deep.equal([]);
        });

        it('should create empty instance with "undefined"', () => {
            const sb = new StringBuilder(undefined);
            expect(sb._stringArray).to.deep.equal([]);
        });

        it('should create instance with valid string', () => {
            const sb = new StringBuilder('Hello');
            expect(sb._stringArray).to.deep.equal(['H', 'e', 'l', 'l', 'o']);
        });

        it('should throw TypeError with non-string argument', () => {
            expect(() => new StringBuilder(123)).to.throw(TypeError, 'Argument must be a string');
            expect(() => new StringBuilder({})).to.throw(TypeError, 'Argument must be a string');
            expect(() => new StringBuilder([])).to.throw(TypeError, 'Argument must be a string');
            expect(() => new StringBuilder(null)).to.throw(TypeError, 'Argument must be a string');
        });
    });

    describe('Method existence', function () {
        it('should have all instance methods', () => {
            const sb = new StringBuilder();
            expect(sb).to.have.property('append').that.is.a('function');
            expect(sb).to.have.property('prepend').that.is.a('function');
            expect(sb).to.have.property('insertAt').that.is.a('function');
            expect(sb).to.have.property('remove').that.is.a('function');
            expect(sb).to.have.property('toString').that.is.a('function');
        });

        it('should have static _vrfyParam method', () => {
            expect(StringBuilder).to.have.property('_vrfyParam').that.is.a('function');
        });
    });

    describe('toString', function () {
        it('should return all elements joined by empty string', () => {
            const sb = new StringBuilder('hello');
            expect(sb.toString()).to.equal('hello');
        });

        it('should return empty string for empty instance', () => {
            const sb = new StringBuilder();
            expect(sb.toString()).to.equal('');
        });
    });

    describe('append', function () {
        it('should add string to the end', () => {
            const sb = new StringBuilder('hello');
            sb.append(' world');
            expect(sb.toString()).to.equal('hello world');
        });

        it('should throw TypeError with non-string argument', () => {
            const sb = new StringBuilder('hello');
            expect(() => sb.append(123)).to.throw(TypeError, 'Argument must be a string');
        });
    });

    describe('prepend', function () {
        it('should add string to the beginning', () => {
            const sb = new StringBuilder('world');
            sb.prepend('hello ');
            expect(sb.toString()).to.equal('hello world');
        });

        it('should throw TypeError with non-string argument', () => {
            const sb = new StringBuilder('hello');
            expect(() => sb.prepend(123)).to.throw(TypeError, 'Argument must be a string');
        });
    });

    describe('insertAt', function () {
        it('should add string at given index', () => {
            const sb = new StringBuilder('hello');
            sb.insertAt('123', 2);
            expect(sb.toString()).to.equal('he123llo');
        });

        it('should add string at the beginning (index 0)', () => {
            const sb = new StringBuilder('world');
            sb.insertAt('hello ', 0);
            expect(sb.toString()).to.equal('hello world');
        });

        it('should add string at the end (index = length)', () => {
            const sb = new StringBuilder('hello');
            sb.insertAt(' world', 5);
            expect(sb.toString()).to.equal('hello world');
        });

        it('should throw TypeError with non-string argument', () => {
            const sb = new StringBuilder('hello');
            expect(() => sb.insertAt(123, 2)).to.throw(TypeError, 'Argument must be a string');
        });
    });

    describe('remove', function () {
        it('should remove elements from storage', () => {
            const sb = new StringBuilder('hello world');
            sb.remove(5, 1);
            expect(sb.toString()).to.equal('helloworld');
        });

        it('should remove from the beginning', () => {
            const sb = new StringBuilder('hello world');
            sb.remove(0, 6);
            expect(sb.toString()).to.equal('world');
        });

        it('should remove from the end', () => {
            const sb = new StringBuilder('hello world');
            sb.remove(10, 1);
            expect(sb.toString()).to.equal('hello worl');
        });

        it('should remove with length 0 (nothing happens)', () => {
            const sb = new StringBuilder('hello');
            sb.remove(2, 0);
            expect(sb.toString()).to.equal('hello');
        });

        it('should remove all characters', () => {
            const sb = new StringBuilder('hello');
            sb.remove(0, 5);
            expect(sb.toString()).to.equal('');
        });
    });

    describe('_vrfyParam', function () {
        it('should not throw TypeError for string argument', () => {
            expect(() => StringBuilder._vrfyParam('test')).to.not.throw();
            expect(() => StringBuilder._vrfyParam('')).to.not.throw();
        });

        it('should throw TypeError for number', () => {
            expect(() => StringBuilder._vrfyParam(123)).to.throw(TypeError, 'Argument must be a string');
        });

        it('should throw TypeError for null', () => {
            expect(() => StringBuilder._vrfyParam(null)).to.throw(TypeError, 'Argument must be a string');
        });

        it('should throw TypeError for object', () => {
            expect(() => StringBuilder._vrfyParam({})).to.throw(TypeError, 'Argument must be a string');
        });

        it('should throw TypeError for array', () => {
            expect(() => StringBuilder._vrfyParam([])).to.throw(TypeError, 'Argument must be a string');
        });

        it('should throw TypeError for boolean', () => {
            expect(() => StringBuilder._vrfyParam(true)).to.throw(TypeError, 'Argument must be a string');
            expect(() => StringBuilder._vrfyParam(false)).to.throw(TypeError, 'Argument must be a string');
        });
    });
});
