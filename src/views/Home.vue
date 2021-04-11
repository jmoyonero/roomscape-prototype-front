<template>
  <div class="main_container">
    <section class="title">VIDEOJUEGOS</section>
    <div class="view_container">
      <b-form class="form_new_video_game" @submit="onSubmit" @reset="onReset">
        <b-form-group
            id="input-group-1"
            label="Nombre del videojuego:"
            label-for="input-1"
        >
          <b-form-input
              class="text-center"
              id="input-1"
              v-model="currentVideoGame.name"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Consola:" label-for="select">
          <div>
            <b-form-select
                id="select"
                v-model="currentVideoGame.console"
                :options="consoles"
                required
            ></b-form-select>
          </div>
        </b-form-group>

        <b-form-group id="input-group-3" label="Descripción:" label-for="textarea">
          <b-form-textarea
              id="textarea"
              v-model="currentVideoGame.description"
              placeholder=""
              rows="3"
              max-rows="6"
          ></b-form-textarea>
        </b-form-group>

        <div id="buttons" class="d-flex justify-content-between">
          <b-button id="save" type="submit" variant="primary">Guardar</b-button>
          <b-button type="reset" variant="danger">Limpiar</b-button>
        </div>

      </b-form>
      <div class="table_video_games">
        <b-table
            id="table_video_games"
            striped
            sticky-header
            sticky="100%"
            head-variant="dark"
            hover
            :items="videoGames"
            :fields="fields"
            sort-by="id"
            sort-desc
            class="table_video_games"
        ></b-table>
      </div>
    </div>

    <ModalMessage
        :timeToShow="modal.timeToShow"
        :message="modal.message"
        :title="modal.title"
        :variant="modal.variant"
        :id="modal.id"
        class="custom-modal"
    ></ModalMessage>
  </div>
</template>

<script>
import axios from "axios";
import ModalMessage from "@/components/ModalMessage";

export const BACKEND_URL = process.env.VUE_APP_BACKEND_URL;

export default {
  name: 'Home',
  components: {ModalMessage},
  data() {
    return {
      consoles: ['Nintendo Switch', 'PC', 'PS4', 'PS5', 'XBox'],
      videoGames: [],
      currentVideoGame: {
        name: '',
        description: '',
        console: ''
      },
      fields: [
        {key: 'id', label: 'ID', sortable: true},
        {key: 'name', label: 'Nombre', sortable: true},
        {key: 'console', label: 'Consola', sortable: true},
        {key: 'description', label: 'Descripción', sortable: true},
      ],
      modal: {
        timeToShow: 0,
        title: '',
        message: '',
        variant: '',
        id: 0
      }
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      axios
          .post(BACKEND_URL + '/add', this.currentVideoGame,)
          .then(response => {
            this.showSuccessModal(response.data)
            this.refreshTable()
            this.resetForm()
          })
          .catch(err => {
            if (err.response && err.response.status == 400) {
              this.showWarningModal(err.response.data)
            }
          })
    },
    onReset(event) {
      event.preventDefault()
      this.resetForm()
    },
    resetForm() {
      this.currentVideoGame.name = ''
      this.currentVideoGame.description = ''
      this.currentVideoGame.console = ''
    },
    refreshTable() {
      axios
          .get(BACKEND_URL + '/list')
          .then(response => {
            this.videoGames = response.data
          })
    },
    showSuccessModal(videoGame) {
      this.modal.timeToShow = 5
      this.modal.title = "¡Operación Exitosa!"
      this.modal.message = "Se ha registrado correctamente el videojuego: " + videoGame.name + " para la consola " + videoGame.console
      this.modal.id = videoGame.id
      this.modal.variant = 'success'
      setTimeout(() => this.modal.timeToShow = 0, 5000);
    },
    showWarningModal(videoGame) {
      this.modal.timeToShow = 5
      this.modal.message = "No se puede registrar el videojuego: " + videoGame.name + " para la consola " + videoGame.console + " porque ya existe."
      this.modal.title = "¡Operación Fallida!"
      this.modal.id = videoGame.id
      this.modal.variant = 'warning'
      setTimeout(() => this.modal.timeToShow = 0, 5000);
    }
  },
  created() {
    this.refreshTable()
  }
}
</script>

<style scoped>

.main_container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.view_container {
  display: flex;
  justify-content: space-evenly;
  padding-top: 100px;
}

.table_video_games {
  margin: 0px 20px 20px 0px;
}

.form_new_video_game {
  min-width: 300px;
  margin: 20px;
}

@media only screen and (max-width: 768px) {
  .view_container {
    padding-top: 10px;
    display: flex;
    flex-direction: column;
  }

  #buttons {
    display: flex;
    justify-content: center;
  }

  button {
    width: 50%;
  }

  .table_video_games {
    padding-top: 10px;
    margin: 0px 0px 0px 0px;
  }
}

.table_video_games {
  max-height: 600px;
}

.custom-modal {
  position: absolute;
  bottom: 0;
}

.title {
  background-color: #212529;
  height: 100px;
  width: 100%;
  line-height: 100px;
  color: white;
  font-size: 35px;
  font-family: 'Dela Gothic One', cursive;
}


select {
  text-align-last: center;
  padding-left: 28px;
}

</style>
