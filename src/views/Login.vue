<template>
    <div class="login">
        <section class="mt-5">
            <div class="container">
                <div class="border">
                    <div class="row g-0">
                        <div class="col-sm-4 col-lg-7">
                            <figure id="login-background-image">
                                <img src="../assets/login-background.jpg" alt="Edificios">
                            </figure>
                        </div>
                        <div class="col-sm-8 col-lg-5">
                            <div class="px-5 py-5">
                                <h1 class="text-primary text-center fw-bold">Inicio de sesión</h1>
                                <h3 class="text-primary text-center mt-5">¡Bienvenido!</h3>
                                <div v-if="alert.type && alert.message" class="alert mt-5" :class="alert.type" role="alert">
                                    {{ alert.message }}
                                </div>
                                <login-form @user-login="login($event)"></login-form>
                            <!-- <button @click="validateUser" class="btn btn-primary">Obtener usuarios</button>
                            -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue'

export default {
    name: 'Login',
    components: {
        LoginForm
    },
    data() {
        return {
            alert: {
                type: '',
                message: ''
            }
        }
    },
    beforeCreate() {
        if (this.$session.exists()) {
            this.$router.push('/')
        }
    },
    methods: {
        async userValidate(user) {
            try {
                const response = await fetch('http://localhost:8080/api/users/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify(user)
                })
                const data = await response.json()
                //console.log(data)
                if(data.message === 'OK') {
                    this.alert.type = ''
                    this.alert.message = ''
                    this.$session.start()
                    this.$session.set('username', data.user.username)
                    this.$session.set('rol', data.user.rol)
                    this.$session.set('email', data.user.email)
                    console.log(data.user.email)
                    this.$session.set('fullName', data.user.fullName)
                    if(data.user.rol.name === 'ADMINISTRADOR') {
                        this.$router.push('admin')
                    } else if (data.user.rol.name === 'INVITADO') {
                        this.$router.push('guest')
                    }
                    this.$emit('change-logged-in', true)
                } else {
                    this.alert.type = 'alert-danger'
                    this.alert.message = 'Usuario o contraseña incorrectos'
                }
            } catch (error) {
                console.log(error)
            }
        },
        login(user) {
            this.$http.post('http://localhost:8080/api/users/login', {
                username: user.username,
                password: user.password
          }).then(function (response) {
            if (response.body.message === 'OK') {
                this.alert.type = ''
                this.alert.message = ''
                this.$session.start()
                this.$session.set('username', response.body.user.username)
                this.$session.set('rol', response.body.user.rol)
                this.$session.set('fullName', response.body.user.fullName)
                this.$session.set('email', response.body.user.email)
                this.$emit('change-logged-in', true)
                if(response.body.user.rol.name === 'ADMINISTRADOR') {
                    this.$router.push('admin')
                } else if (response.body.user.rol.name === 'INVITADO') {
                    this.$router.push('guest')
                }
            } else {
                this.alert.type = 'alert-danger'
                this.alert.message = 'Usuario o contraseña incorrectos'              
            }
          }, function (err) {
            console.log('err', err)
          })
        }
    }
}
</script>