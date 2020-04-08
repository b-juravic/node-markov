/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
    this.markovChains;
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  // refactored makeChains

  makeChains() {

    let markovWordObj = {};

    for (let i = 0; i < this.words.length; i++) {
      if ( i < this.words.length - 1) {
        let value = markovWordObj[this.words[i]] || [];
        value.push(this.words[i + 1]);

        markovWordObj[this.words[i]] = value;

      } else {
        let value = markovWordObj[this.words[i]] || [];
        value.push(null);

        markovWordObj[this.words[i]] = value;
      }
    }
    this.markovChains = markovWordObj;
  }


  // static choice(ar) {
  //   return ar[Math.floor(Math.random() * ar.length)];
  // }

  /** return random text from chains */

  // Partly from solution

//   makeText(numWords = 100) {

//     let keys = Object.keys(this.markovChains);
//     let key = MarkovMachine.choice(keys);
//     let resultArr = [];

//     while (resultArr.length < numWords && key !== null) {

//       resultArr.push(key);
//       key = MarkovMachine.choice(this.markovChains[key]);

//     }
//     let resultPhrase = resultArr.join(" ");
//     return resultPhrase;
//   }
// }

makeText(numWords = 100) {

  let startIdx = Math.floor(Math.random() * this.words.length);

  let startWord = this.words[startIdx];
  let resultArr = [];
  let currWordOptions, randomWordIdx;

  resultArr.push(startWord);

  for (let j = 0; j < numWords - 1; j++) {

    currWordOptions = this.markovChains[resultArr[j]].length;
    randomWordIdx = Math.floor(Math.random() * currWordOptions);

    if (this.markovChains[resultArr[j]][randomWordIdx] === null) {

      break;

    } else {

    resultArr.push(this.markovChains[resultArr[j]][randomWordIdx]);

    }
  }
  let resultPhrase = resultArr.join(" ");
  return resultPhrase;
}
}

module.exports = {
  MarkovMachine,
};