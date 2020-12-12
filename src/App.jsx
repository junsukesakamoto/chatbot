import React from 'react';
import defaultDataset from "./dataset"
import './assets/styles/style.css'
import {AnswersList,Chats} from './components/index'
import FormDialog from './components/Forms/FormDialog'


export default class App extends React.Component{
  constructor(props){
      super(props);
      this.state={
        answers:[],   //回答コンポーネントに表示するデータ
        chats:[],     //チャットコンポーネントに表示するデータ
        currentId:"init", //現在の質問ID
        dataset:defaultDataset, //質問と回答のデータセット
        open:false  //問い合わせフォーム用モーダルの開閉を管理
      }
      this.selectAnswer = this.selectAnswer.bind(this)
      this.handleClose = this.handleClose.bind(this)
      this.handleClickOpen = this.handleClickOpen.bind(this)
  }

  //次の質問をチャットエリアに表示する関数
  displayNextQuestion = (nextQuestionId) =>{
    const chats = this.state.chats
    chats.push({
      text:this.state.dataset[nextQuestionId].question,
      type: 'question'
    })

    this.setState({
      answers:this.state.dataset[nextQuestionId].answers,
      chats:chats,
      currentId:nextQuestionId
    })
  }
  //回答が選択された時に呼ばれる関数
  selectAnswer = (selectedAnswer,nextQuestionId) =>{
    switch(true){
      case(nextQuestionId==='init'):
        this.displayNextQuestion(nextQuestionId)
        break;

      case(nextQuestionId === 'contact'):
        this.handleClickOpen();
        break;
      //リンクが選択された時そのリンクに飛ばしてあげる関数
      case(/^http*/.test(nextQuestionId)):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click();
        break;
      //選択された回答をchatsに追加
      default:
        const chats= this.state.chats;
        //現在のチャット一覧を取得
        chats.push({
          text: selectedAnswer,
          type: 'answer'
        })      
        this.setState({
          chats:chats
        })

        setTimeout(() => this.displayNextQuestion(nextQuestionId),500);
        break;
    }
  }
//クリックで問い合わせモーダルを開く
handleClickOpen = () => {
    this.setState({open:true});
};
//問い合わせモーダルを閉じる
handleClose = () => {
    this.setState({open:false});
};
  //回答を空白で初期化
  componentDidMount(){
    const initAnswer = "";  
    this.selectAnswer(initAnswer,this.state.currentId)
  }
  //回答が増えたら自動スクロール
  componentDidUpdate(prevProps,prevState,snapshot){
      const scrollArea=document.getElementById('scroll-area')
      if(scrollArea){
        scrollArea.scrollTop = scrollArea.scrollHeight
      }
  }

  render(){
    return(
      <div>
        <section className="c-section">
          <div className="c-box">　
            <Chats chats={this.state.chats}/>
            <AnswersList answers={this.state.answers} select={this.selectAnswer}/>
            <FormDialog open={this.state.open} handleClose={this.handleClose}/>
          </div>
        </section>
      </div>
    );
  }
}
