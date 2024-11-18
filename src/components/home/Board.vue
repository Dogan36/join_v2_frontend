<template>
  <div class="summary">
    <div class="headlineComponent">
      <h1 class="headline">Board</h1>
      <div class="boardHeadlineRight">
        <div class="findTask">
          <input placeholder="Find Task" type="text">
          <div class="graySeperator"></div>
          <img src="@/assets/img/searchIcon.svg" alt="">
        </div>
        <div class="main-button-layout">Add Task <img src="@/assets/img/plusIcon.svg" alt=""></div>
      </div>
    </div>
  

  <div class="contentBoard">
       <div class="boardElement">
        <div class="boardElementHeader">
          <span>To do</span>
          <img src="@/assets/img/boardPlusIcon.svg" alt="">
        </div>
        <div class="boardElementContent">
          <div class="boardElementEmpty">No Task To Do</div>
        </div>
      </div>
       <div class="boardElement">
        <div class="boardElementHeader">
          <span>In Progress</span>
          <img src="@/assets/img/boardPlusIcon.svg" alt="">
        </div>
        <div class="boardElementContent">
          <BoardCard/>
          <BoardCard/>
          <BoardCard/>
        </div>
      </div>
       <div class="boardElement">
        <div class="boardElementHeader">
          <span>Awaiting Feedback</span>
          <img src="@/assets/img/boardPlusIcon.svg" alt="">
        </div>
        <div class="boardElementContent"></div>
      </div>
       <div class="boardElement">
        <div class="boardElementHeader">
          <span>Done</span>
          <img src="@/assets/img/boardPlusIcon.svg" alt="">
        </div>
        <div class="boardElementContent"> 
          <div class="boardElementEmpty">No Task To Do</div>
          
        </div>
      </div>
  </div>
</div>
</template>

<style scoped>
.headlineComponent {
  justify-content: space-between;
}

.boardHeadlineRight {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3.5rem;
}

.findTask {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1.3rem 2.1rem;
  gap: 5px;
  background: #FFFFFF;
  border: 1px solid #A8A8A8;
  border-radius: 10px;

  input {
    border: none;
    background: none;
    outline: none;
    font-size: 1.6rem;
  }

  .graySeperator {
    width: 2px;
    height: 20px;
    background: #D1D1D1;
  }

}

.main-button-layout {
  padding: 1rem 1.5rem;
}

.contentBoard {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px;
  gap: 2.6rem;
  flex-wrap: wrap;

}

.boardElement {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 25.5rem;

  .boardElementHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-weight: 700;
      font-size: 2.1rem;
      color: var(--main-color);
    }
  }

  .boardBottomDiv {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%
  }
}

.boardElementEmpty {
  width: 100%;
  height: 4.8rem;
  border-radius: 10px;
  border: 1px;
  background-color: #E7E7E7;
  color: #A8A8A8;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 2rem;
  font-size: 1.6rem;
}
</style>

<script setup>
import BoardCard from '../shared/BoardCard.vue';
</script>