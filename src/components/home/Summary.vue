<template>
  <div class="summary">

      <div class="headlineComponent">
        <h1 class="headline">Join 360</h1>
        <img class="headlineSeperator" src="@/assets/img/headlineSeperator.svg" alt="">
        <h2>Key Metrics at a Glance</h2>
      </div>

      <div class="contentSummary">
        <div class="contentButtons">

          <div class="buttonContainerRow">
            <div class="buttonSummary buttonV1">
              <div class="buttonContent">
              <span id="summaryCountInBoard" class="buttonNumber">1</span>
              <span class="buttonText ">Tasks in Board</span>
              </div>
            </div>
            <div  onclick="document.getElementById('board').click()"class="buttonSummary buttonV1">
              <div class="buttonContent">
              <div id="summaryCountProgress" class="buttonNumber">1</div>
              <div class="buttonText">Tasks in Progress</div>
              </div>
            </div>
            <div onclick="document.getElementById('board').click()" class="buttonSummary buttonV1">
              <div class="buttonContent">
              <div id="summaryCountAwaiting" class="buttonNumber">1</div>
              <div class="buttonText">Tasks in Feedback</div>
              </div>
            </div>
          </div>
          <div class="buttonContainerRow">
          <div class="buttonSummary buttonV2">
            <div class="buttonV2Left">
              
                <img
                  src="@/assets/img/prioMedium.svg"
                  alt=""
                />
              
              <div class="buttonContent">
                <span id="summaryCountUrgent"class="buttonNumber">2</span>
                <span class="buttonText">Urgent</span>
              </div>
            </div>
            <div class="graySeperator"></div>
            <div class="buttonV2RightContent">
              <div id="summaryNextDeadline"class="buttonText">01.01.22</div>
              <div class="buttonV2TextBold">Upcoming Deadline</div>
            </div>
          </div>
        </div>
          <div class="buttonContainerRow">
            <div class="buttonSummary buttonV3">
              <div class="penIcon"></div>
              <div class="buttonContent">
                <div id="summaryCountToDo" class="buttonNumber">2</div>
                <div class="buttonText">To-do</div>
              </div>
            </div>
            <div class="buttonSummary buttonV3">
              <div class="hookIcon"></div>
              <div class="buttonContent">
                  <div class="buttonNumber">2</div>
                  <div class="buttonText">Done</div>
              </div>
          </div>
          </div>
        </div>
        <div id="welcomeDesk" class="welcomeDesk">
          <span id="welcomeText">Good Morning</span>
          <span id="welcomeName">Dogan</span>
      </div>
      </div>
    </div>
  </template>

<style scoped>
.contentSummary {
  display: flex;
  align-items: center;
  gap: 5rem
}

.contentButtons {
  display: flex;
  gap: 3.5rem;
  flex-direction: column;
  min-width: 58rem;
}

.buttonContainerRow {
  display: flex;
  gap: 3.5rem;
}

.buttonSummary {
display: flex;
align-items: center;
justify-content: center;
  height: 15rem;
  background: #FFFFFF;
  box-shadow: 0px 0px 4px rgb(0 0 0 / 10%);
  border-radius: 20px;
  flex: none;
  cursor: pointer;
  transition: all 0.175s ease-in-out;
  padding: 1.5rem;
}

.buttonContent {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.buttonSummary:hover {
  transform: scale(1.05);
  background-color: #2A3647;
  transition: all 0.175s ease-in-out;
  color: white;
}

.buttonNumber {
  font-size: 5.5rem;
  font-style: normal;
  font-weight: 600;
}

.buttonText {
  width: 8.7rem;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 2.1rem;
  line-height: 120%;
  text-align: center;
  flex: none;
  flex-grow: 0;

}

.buttonV1 {
  width: calc((100% - 7rem) / 3);
}

.buttonV2 {
  width: 100%;
  flex-direction: row;
  justify-content: space-around;

  img {
    width: 7rem;
    height: 7rem;
  }

  .buttonV2TextBold {
    font-size: 2.1rem;
    font-weight: 600;
  }
}

.buttonV2Left {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
}

.graySeperator {
  border: 2px solid #D1D1D1;
  height: 100%;
  transition: all 0.175s ease-in-out;
}

.buttonV2:hover .graySeperator {
  background: white;
  border: 2px solid #ffffff;
}

.buttonV2RightContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.buttonV3 {
  width: calc((100% - 3.5rem) / 2);
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.penIcon,
.hookIcon {
  width: 7rem;
  height: 7rem;
  background-size: cover;
  background-repeat: no-repeat;

}

.penIcon::before,
.hookIcon::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  transition: all 0.175s ease-in-out;
}

.penIcon::before {
  background-image: url('@/assets/img/pen.svg');
}

.hookIcon::before {
  background-image: url('@/assets/img/hook.svg');
}

.buttonV3:first-of-type:hover .penIcon:first-of-type::before {
  background-image: url('@/assets/img/penWhite.svg');
}

.buttonV3:hover .hookIcon::before {
  background-image: url('@/assets/img/hookWhite.svg');
}

.welcomeDesk {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3rem;
  span:first-child {
    font-size: 4.7rem;
    font-weight: 500;
    text-align: center;
  }
  span:last-child {
    font-size: 6.4rem;
    font-weight: 700;
    color: var(--main-color-hover);
    text-align: center;
  }
}
</style>