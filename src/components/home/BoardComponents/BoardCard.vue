<template>
    <div draggable="true" class="boardCard">
        <div class="cardCategory">Programming</div>
        <div class="cardContent">
            <div class="cardTitle">Test Test Test Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor ullam libero animi ducimus vel, earum deserunt ut nesciunt quisquam, eos odio suscipit beatae voluptas nisi illum nulla aliquam? Dolor, ex.</div>
            <div class="cardDescription">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo nihil necessitatibus, nesciunt pariatur dolorem expedita ipsam odit temporibus, error, possimus eius consectetur explicabo? Est quae dolorem corporis similique. Nemo, explicabo. </div>
        </div>
        <div class="cardProgress">
            <progress max="200" value="100"></progress>
            <div><span>1</span><span>/</span><span>2</span><span>Done</span></div>
        </div>
        <div class="cardBottomDiv">
           <AssignedToAvatars
           :assignedTo="assignedTo"></AssignedToAvatars>
            <img src="@/assets/img/prioMediumIcon.svg" alt="">
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import AssignedToAvatars from '@/components/shared/AssignedToAvatars.vue';
const assignedTo = ref([
    { id: 1, name: 'John Doe', avatar: 'JD' },
    { id: 2, name: 'Jane Doe', avatar: 'JD' },
    { id: 3, name: 'Max Mustermann', avatar: 'MM' },
    { id: 4, name: 'Maxine Mustermann', avatar: 'MM' },
  
]);

</script>
<style scoped>
.boardCard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 18px 19px;
    gap: 20px;
    width: 250px;
    height: 239px;
    background: #FFFFFF;
    box-shadow: 0px 0px 14px 3px rgba(0, 0, 0, 0.04);
    border-radius: 30px;
    cursor: pointer;
    margin-top: 20px;
}

.cardCategory {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 7px 25px;
    background: black;
    border-radius: 8px;
    text-align: center;
    font-size: 16px;
    line-height: 16px;
    font-weight: 400;
    color: #FFFFFF;
    text-shadow: 1px 1px 2px #000;
}




.cardContent {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    min-height: 36%;
   
}

.cardProgress {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 20px;
    width: 209px;
    height: 14px;

    progress {
        width: 100%;
        height: 14px;
    }

    span {
        font-weight: 400;
        font-size: 14px;
        
        color: #000000;
        white-space: nowrap;
    }
}

.cardBottomDiv {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%
}

.cardTitle {
    width: 100%;
    font-weight: 700;
    font-size: 16px;
    line-height: 120%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.cardDescription {
    width: 100%;
    font-weight: 400;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #A8A8A8;
    line-height: 20px;
    max-height: 40px;
}

.cardBottomDiv{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    
    
    img{
        width: 20px;
        height: 20px;
    }
}
</style>
