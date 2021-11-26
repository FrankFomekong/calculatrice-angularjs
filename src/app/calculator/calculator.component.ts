import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  constructor() {}
  limites: RegExp = new RegExp('');
  screen: string = '0';
  input: string = '';
  result: string = '';
  output: string = '';
  recent: boolean = false;
  ngOnInit(): void {
    //this.input='0';
  }
  pressNum(num: string) {
    if(this.screen=='0'){
      this.screen='';
    }
    if (this.recent == true) {
      this.input = '';
      this.screen='';
      this.recent = false;
    }

    //On evite les entrees de chifrees avec plusieurs virgules
    if (num == '.') {
      if (this.input != '') {
        const lastNum = this.getLastOperand();
        console.log(lastNum.lastIndexOf('.'));
        if (lastNum.lastIndexOf('.') >= 0) return;
      }
    }

    //Do Not Allow 0 at beginning.
    //Javascript will throw Octal literals are not allowed in strict mode.
    if (num == '0') {
      if (this.input == '') {
        this.screen='0';
        return;
      }

      // const PrevKey = this.input[this.input.length - 1];
      // if (
      //   PrevKey === '/' ||
      //   PrevKey === '*' ||
      //   PrevKey === '-' ||
      //   PrevKey === '+'
      // ) {
      //   this.screen+=num;
      //   return;
      // }
    }
    this.screen = this.screen + num;
    this.input = this.input + num;
   // this.calcAnswer();
  }

  getLastOperand() {
    let pos: number;
    console.log(this.input);
    pos = this.input.toString().lastIndexOf('+');
    if (this.input.toString().lastIndexOf('-') > pos)
      pos = this.input.lastIndexOf('-');
    if (this.input.toString().lastIndexOf('*') > pos)
      pos = this.input.lastIndexOf('*');
    if (this.input.toString().lastIndexOf('/') > pos)
      pos = this.input.lastIndexOf('/');
    console.log('Last ' + this.input.substr(pos + 1));
    return this.input.substr(pos + 1);
  }

  pressOperator(op: string) {
    //Pour eviter les debordements
    if (this.recent == true) {
      this.screen = 'Ans';
      this.input = this.result;
    }
    this.recent = false;
    const lastKey = this.input[this.input.length - 1];
    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+'
    ) {
      this.input = this.input.substr(0, this.input.length - 1);
      this.screen = this.screen.substr(0, this.screen.length - 1);
    }
    //on s'assure qu'une operation ne commence pas par * ou /
    if (this.screen == '' && (op == '/' || op == '*')) {

    } else {
      this.screen = this.screen + op;
      this.input = this.input + op;
     // this.calcAnswer();
    }
  }

  clear() {
    if (this.input != '') {
      try {
        if (this.recent == false) {
          if (this.screen == 'Ans') {
            this.screen='0';
            this.recent = true;
          } else {
            this.input = this.input.substr(0, this.input.length - 1);
            this.screen = this.screen.substr(0, this.screen.length - 1);
          }
        } else {
          this.screen='0';
        }
      } catch (e) {
        this.allClear();
      }
    }
  }

  allClear() {
    this.result = '';
    this.screen='0';
    this.input = '';
    this.output = '';
    this.recent=false;
  }

  calcAnswer() {
    let formula = this.input;

    let lastKey = formula[formula.length - 1];

    if (lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }

    lastKey = formula[formula.length - 1];

    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+' ||
      lastKey === '.'
    ) {
      formula = formula.substr(0, formula.length - 1);
      // this.allClear();
      // this.screen='Syntax Error';
      // return
    }

    console.log('Formule evaluee ' + formula);
    if(
    this.input === '*' ||
    this.input === '-' ||
    this.input === '+' ||
    this.input === '.'){
      this.result ='0';
      this.screen='0';
    }
    else{
      this.result = eval(formula);
     }
    console.log(Math.fround(eval(formula)));
    //Math.fround(eval(formula))
  }

  getAnswer() {
    try {
      console.log('essai '+this.input);

      this.calcAnswer();
      //this.input = this.result;
      //document.g('res').textContent=this.input
      this.output = this.result;
      if (this.input == '0') this.input = '';
      // if(this.input == '') {
      //   this.input='0';
      //   this.output = '0';}
      this.recent = true;
    } catch (err) {
      this.screen = 'Error';
      this.input = '';
      this.recent = false;
    }

  }
}
