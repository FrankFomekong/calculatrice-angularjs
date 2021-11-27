import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  constructor() {}
  //limites: RegExp = new RegExp('');
  screen: string = '';
  input: string[] = [];
  tmp: string = '';
  optn: string[] = [];
  ans: string = '';
  recent: boolean = false;
  result: string = '';
  output: string = '0';
  error: boolean = false;
  ngOnInit(): void {
    //this.input='0';
  }
  pressNum(num: string) {
    if (this.recent == false) {
      this.tmp += num;
      this.screen += num;
    } else {
      this.screen = '';
      this.tmp = num;
      this.screen += num;
      this.recent = false;
    }
  }

  pressOperator(op: string) {
    if (this.recent == false) {
      if (this.tmp == '') {
        this.input.push('0');
        this.screen += op;
        if(this.optn.length>1|| op=='/' || op=='*')
          this.error = true;

      } else {
        this.input.push(this.tmp);
        this.screen += op;
      }
      this.optn.push(op);
      this.tmp = '';
    } else {
      this.screen = 'Ans' + op;
      this.input.push(this.ans);
      this.optn.push(op);
      this.recent = false;
    }
  }

  clear() {
    if (this.recent == false) {
      if (this.tmp.toString() != '') {
        this.screen = this.screen.substr(0, this.screen.length - 1);
        this.tmp = this.tmp.substr(0, this.tmp.length - 1);
      }
      // }else{
      //   this.optn.pop();
      //   this.screen = this.screen.substr(0, this.screen.length - 1);
      //   this.tmp=this.input[this.input.length-1];
      //   this.input.pop();
      // }
    }
  }

  allClear() {
    this.screen = '';
    this.input = [];
    this.optn = [];
    this.output = '0';
    this.tmp = '';
  }

  calcAnswer() {
    this.input.push(this.tmp);
    this.tmp = '';
    let n = this.optn.length;
    let res = Number(this.input[0]);
    // for (let i = 0; i < n; i++) {
    //   console.log(res);
    //   switch (this.optn[i]) {
    //     case '*':
    //       res = res * Number(this.input[i + 1]);
    //       console.log(this.input[i + 1]);

    //       break;
    //     case '/':
    //       res = res / Number(this.input[i + 1]);
    //       break;
    //     case '+':
    //       res = res + Number(this.input[i + 1]);
    //       break;
    //     case '-':
    //       res = res - Number(this.input[i + 1]);
    //       break;
    //     default:
    //       console.log(res);
    //   }
    // }
    let res2 = Number(this.input[0]).toString();
    for (let i = 0; i < n; i++) {
      res2 += this.optn[i] + Number(this.input[i + 1]).toString();
    }
    this.result = eval(res2);
    console.log(this.result);
    // this.result = res.toString();
    this.optn = [];
    this.input = [];

   }

  getAnswer() {
    if (this.recent == true) {
    } else if (this.error) {
      this.output = 'Syntax Error';
      this.screen = '';
      this.optn = [];
      this.input = [];
      this.error = false;
    } else if (this.optn.length > 0 && this.tmp != '') {
      this.calcAnswer();
      this.output = this.result;
      if (
        this.output.toString() != 'NaN' &&
        this.output.toString() != 'Infinity'
      ) {
        this.ans = this.result;
        this.recent = true;
      } else {
        this.output = 'Math Error';
        this.optn = [];
        this.input = [];
        this.screen = '';
      }
    } else if (this.tmp == '') {
      this.output = 'Syntax Error';
      this.screen = '';
      this.optn = [];
      this.input = [];
    } else {
      this.result = Number(this.tmp).toString();
      console.log(this.result);
      if (this.result.toString() == 'NaN') {
        this.output = 'Syntax Error';
        this.optn = [];
        this.input = [];
        this.screen = '';
      } else {
        this.ans = this.tmp;
        this.recent = true;
      }
    }
    return;
  }
}
