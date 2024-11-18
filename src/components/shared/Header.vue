<template>
  <div class="header">
    <img class="logoHeaderMobile" src="@/assets/img/logo.svg" alt="">
    <p class="headerHeadline">Kanban Projekt Management Tool</p>
    <div class="headerUserProfil">
        <img class="headerUserProfilIcon" src="@/assets/img/questionmark.svg" alt="" onclick="showContent('helpContent')">
        <div class="headerUserProfilInitials" onclick="toggleLogout()"></div>
    </div>
</div>
</template>

<style>
.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 50px;
    height: 60px;
    position: sticky;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1); 
    background-color: #f6f7f8;
}

.headerHeadline {
 
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 21px;
}

.headerUserProfil {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 26px;
}

.headerUserProfilIcon {
    cursor: pointer;
}

.headerUserProfilIcon:hover {
    filter: invert(1);
}

.headerUserProfilInitials {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1px;
    gap: 16px;
    width: 49px;
    height: 49px;
    border-radius: 100%;
    border: solid black 2px;
    background-color: #CDCDCD;
    font-size: 20px;
    color: white;
    cursor: pointer;
}

.logoHeaderMobile {
    height: 100%;
    display: none;
}
</style>