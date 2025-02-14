<template>
  <div class="help-content">
    <div class="headline-component">
      <img
        v-if="route.path !== '/home'"
        src="@/assets/img/arrowLeft.svg"
        alt="Back Arrow"
        @click="goToStart"
      />
      <h1>Help &amp; Support</h1>
    </div>

    <p class="help-text">
      Welcome to the help page for Join, your guide to mastering our kanban project management tool. In this guide,
      you'll find everything you need to get started, tips for effective use, and answers to common questions.
    </p>

    <h2 class="help-subtitle">What is Join?</h2>
    <p class="help-text">
      Join is a kanban-based project management tool that I developed as part of my web development bootcamp at the Developer Akademie.
      In Join, you can organize your projects in separate workspaces. Each workspace allows you to manage tasks using boards and lists,
      add contacts for collaboration, and invite members to work together on projects.
      <br /><br />
      Please note that Join was created as an educational project and may not offer the robustness required for extensive business usage.
      I continue to improve its features and reliability, so feel free to reach out with any questions.
    </p>

    <h2 class="help-subtitle">How to use Join</h2>
    <p class="help-text">
      Follow these simple steps to get the most out of Join:
    </p>

    <div class="steps">
      <div class="step">
        <div class="step-number">1</div>
        <div class="step-content">
          <h3 class="step-title">Explore Your Workspace &amp; Board</h3>
          <p>
            Once you log in, select your desired workspace. Within each workspace, you’ll find a default board
            containing several columns: "To Do", "In Progress", "Await Feedback", and "Done", each representing a stage
            of your project's lifecycle.
          </p>
        </div>
      </div>

      <div class="step">
        <div class="step-number">2</div>
        <div class="step-content">
          <h3 class="step-title">Manage Contacts &amp; Members</h3>
          <p>
            In Join you can add contacts to keep track of people you collaborate with, as well as invite members to your workspace.
            Head over to the "Contacts" section to add new contacts, and use the workspace settings to invite or remove members.
          </p>
        </div>
      </div>

      <div class="step">
        <div class="step-number">3</div>
        <div class="step-content">
          <h3 class="step-title">Create Cards</h3>
          <p>
            Cards represent individual tasks. Click the "+" button under the desired list to create a new card.
            Enter details such as the task name, description, due date, and assign contacts or members to the task.
          </p>
        </div>
      </div>

      <div class="step">
        <div class="step-number">4</div>
        <div class="step-content">
          <h3 class="step-title">Drag &amp; Drop Cards</h3>
          <p>
            Update your project's progress by moving cards between lists. Simply drag a card to the appropriate list as its status changes.
          </p>
        </div>
      </div>

      <div class="step">
        <div class="step-number">5</div>
        <div class="step-content">
          <h3 class="step-title">Remove Completed Tasks</h3>
          <p>
            Once a task is completed, you can either move it to the "Done" column or delete it entirely.
            Please be cautious when deleting cards, as this action cannot be undone.
            <br /><br />
            For further assistance or feedback, please contact me at
            <a href="mailto:mail@dogan-celik.com">mail@dogan-celik.com</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.headline-component {
  display: flex;
    justify-content: space-between;
    img{
        cursor: pointer;
    }
}

.help-subtitle {
  font-size: 2rem;
  margin-top: 1.5rem;
  font-weight: bold;
}

.help-text {
  margin-bottom: 1rem;
  line-height: 1.5;
}

.steps {
  margin-top: 1rem;
}

.step {
  display: flex;
  margin-bottom: 1rem;
}

.step-number {
  min-width: 30px;
  height: 30px;
  background: #ccc;
  color: #000;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  margin-right: 10px;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: bold;
  margin: 0 0 0.5rem;
}
</style>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const goToStart = () => {
    window.location.href = '/start';
};
</script>