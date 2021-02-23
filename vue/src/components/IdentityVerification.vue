<template>
    <div id="app">
        <v-container id="container">
            <v-container id="container-inside">
                <v-row @dragover="dragover" @dragleave="dragleave" @drop="drop">
                    <v-col cols="12" id="file-input">
                        <input type="file" multiple name="fields[assetsFieldHandle][]" id="assetsFieldHandle" 
                         class="w-px h-px opacity-0 overflow-hidden absolute" @change="onChange" ref="file" accept=".pdf, .key" />
                        <ul class="mt-4" v-if="this.filelist.length" v-cloak>
                            <dt class="text-sm p-1" v-for="file in filelist" :key="file" id="file-list">
                                {{file.name }}
                                <v-btn  rounded class="ml-1 btn-file" @click="remove(filelist.indexOf(file))" title="Remove file" > 
                                    <v-icon class="btn-file">mdi-trash-can</v-icon> 
                                </v-btn>
                            </dt>
                        </ul>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <span id="span-key">Select folder that contains your login key 
                            and private key
                        </span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn id="btn-upload">
                            Upload Files
                            <v-icon>mdi-arrow-collapse-up</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "IdentityVerification",
    el: '#app',
    delimiters: ['${', '}'], // Avoid Twig conflicts
    data() {
        return {
            filelist: [] // Store our uploaded files
        }
    },
    methods: {
        onChange() {
            this.filelist = [...this.$refs.file.files];
        },
        remove(i) {
            this.filelist.splice(i, 1);
        },
        dragover(event) {
        event.preventDefault();
        // Add some visual fluff to show the user can drop its files
        if (!event.currentTarget.classList.contains('bg-green-300')) {
            event.currentTarget.classList.remove('bg-gray-100');
            event.currentTarget.classList.add('bg-green-300');
            }
        },
        dragleave(event) {
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        drop(event) {
            event.preventDefault();
            this.$refs.file.files = event.dataTransfer.files;
            this.onChange(); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        }
    }
}
</script>

<style scoped>
    #app {
        width: 24rem;
    }
    #container {
        padding-top: 1.75rem !important;
        background-color: #E5E5E5;
        height: 24rem;
        width: 50rem;
        box-shadow: 3px 5px #888888;
        margin-left: 15em;
    }
    #btn-upload {
        background-color: #7983A6;
        color: #F2EEEE;
    }
    #span-key {
        color: #000001;
        font-family: Roboto;
        font-weight: 500;
        font-size: 2em;
        opacity: 60%;
    }
    #container-inside {
        background-color: #C4C4C4;
        height: 21.5em;
        width: 40em;
    }
    #file-input {
        margin-top: 1.5em;
        margin-bottom: 0.5em;
    }
    .btn-file {
        background-color: #D32F2F !important;
    }
    #file-list {
        width: 25em;
        align-content: center;
        justify-content: center;
        margin: auto;
        text-align: center;
    }
</style>