namespace IndividualProject4.Controllers {

    export class HomeController {

        private languages;

        constructor(private $http: ng.IHttpService, private $state: ng.ui.IStateService) {
            this.$http.get('/api/languages')
                .then((res) => {
                    this.languages = res.data;
                });
        }

        gotoSelectLanguage() {
            this.$state.go('chooselanguage');   
        }

        gotoSelectEditList() {
            this.$state.go('listtoedit');
        }

    }

    export class ChooseLanguageController {

        private languages;

        constructor(private $http: ng.IHttpService,
            private $state: ng.ui.IStateService,
                    private globalService) {
            this.$http.get('/api/languages')
                .then((res) => {
                    this.languages = res.data;
                });
        }

        selectLanguage(language) {
            this.globalService.SetLanguage(language);
            this.$state.go('choosequiz');   
        }

    }

    export class ShowListController {

        public listPairs;
        public language;
        public topic;

        constructor(private $http: ng.IHttpService,
            private $uibModal: angular.ui.bootstrap.IModalService,
            private $state: ng.ui.IStateService, globalService) {

            this.language = globalService.CurrentLanguage();
            this.topic = globalService.CurrentTopic();
            let path = '/api/pairs/' + this.language +
                '/' + this.topic;

            this.$http.get(path)
                .then((res) => {
                    this.listPairs = res.data;
                });
        }

        testMemory() {
            let x = 5;
        }

        gotoQuiz() {
            this.$state.go('quiz');
        }

        


    }


    export class SelectPracticeListController {

        public quizLists;

        constructor(private $http: ng.IHttpService,
            private $state: ng.ui.IStateService,
            private globalService) {

            let language = globalService.CurrentLanguage();

            this.$http.get('/api/lists/'+language)
                .then((res) => {
                    this.quizLists = res.data;
                });
        }

        testMemory(topic) {
            this.globalService.SetTopic(topic);
            this.$state.go('viewlist');   
        }

    }

    export class QuizController {

        private listPairs;
        private language;
        private topic;
        private onWord;
        private english;
        private target;
        private answer;
        private question;
        private status;

        keyPress(keyEvent) {
            if (keyEvent.which === 13) {

                if (this.target != this.answer) {
                    //user got the answer wrong
                    this.onWord = 0;

                    //tell the user the right answer
                    this.status = 'Wrong: ' + this.target;

                    this.question = this.listPairs[this.onWord].english;
                    this.target = this.listPairs[this.onWord].target;

                }
                else
                {
                    //user got the answer right
                    this.onWord++;

                    this.status = "Correct!";

                    this.question = this.listPairs[this.onWord].english;
                    this.target = this.listPairs[this.onWord].target;
                }

                this.answer = "";


            }
        }
        
        constructor(private $http: ng.IHttpService,
            private $state: ng.ui.IStateService,
            private globalService) {

            //load word list
            this.language = globalService.CurrentLanguage();
            this.topic = globalService.CurrentTopic();
            let path = '/api/pairs/' + this.language +
                '/' + this.topic;

            this.$http.get(path)
                .then((res) => {
                    this.listPairs = res.data;

                    //set up game
                    this.onWord = 0;

                    this.english = this.listPairs[this.onWord].english;
                    this.target = this.listPairs[this.onWord].target;

                    this.question = this.english;

                });

        }

    }

    export class ChooseListToEditController {

        private lists;

        constructor(private $http: ng.IHttpService,
            private $state: ng.ui.IStateService,
            private globalService,
            private $uibModal: angular.ui.bootstrap.IModalService
        ) {

            let path = '/api/lists/';
            this.$http.get(path)
                .then((res) => {
                    this.lists = res.data;
                });

        }

        edit(language, topic) {

            this.globalService.SetTopic(topic);
            this.globalService.SetLanguage(language);
            this.$state.go('editlist');
        }

        gotoParse() {
            this.$state.go('parse');
        }

        editTopic(originalTopic, index) {
            this.$uibModal.open({
                templateUrl: 'ngApp/views/EditTopic.html',
                controller: EditTopicController,
                controllerAs: 'modal',
                resolve: {
                    originalTopic: () => originalTopic
                },
                size: 'sm'
             }).result.then((updatedTopic) => {
                this.lists[index].topic = updatedTopic;

               
                let value = this.lists[index];

                this.$http.put(`/api/lists/${value.id}`, value);

            });

        }

        deleteTopic(originalTopic, originalLanguage, index) {
            this.$uibModal.open({
                templateUrl: 'ngApp/views/DeleteTopic.html',
                controller: DeleteTopicController,
                controllerAs: 'modal',
                resolve: {
                    originalTopic: () => originalTopic,
                    originalLanguage: () => originalLanguage
                },
                size: 'sm'
            }).result.then(() => {
               
                this.$http.delete(`/api/lists/${this.lists[index].id}`);
                this.lists.splice(index, 1);

            });;

        }
    }

    export class EditListController {

        private listPairs;
        private language;
        private topic;

        constructor(private $http: ng.IHttpService,
            private $state: ng.ui.IStateService,
            private $uibModal: angular.ui.bootstrap.IModalService,
            private globalService) {

            this.loadPairs();
        }



        loadPairs() {
            this.language = this.globalService.CurrentLanguage();
            this.topic = this.globalService.CurrentTopic();
            let path = '/api/pairs/' + this.language +
                '/' + this.topic;

            this.$http.get(path)
                .then((res) => {
                    this.listPairs = res.data;
                });
        }

        editWord(english, target, index) {
//            let globalServiceId = id;

            this.$uibModal.open({
                templateUrl: 'ngApp/views/Edit.html',
                controller: EditController,
                controllerAs: 'modal',
                resolve: {
                    english: () => english,
                    target: () => target
                },
                size: 'sm'
            }).result.then((selectedItem) => {
                this.listPairs[index].english = selectedItem.english;
                this.listPairs[index].target = selectedItem.target;

                let value = this.listPairs[index];

                this.$http.put(`/api/pairs/${value.id}`, value);

                });

             // this.$uibModal.result.then((selectedItem) => {
             //     this.selected = selectedItem;
             // });
        }

        deleteWord(id, index) {
            let globalServiceId = id;

            this.$uibModal.open({
                templateUrl: '/ngApp/views/Delete.html',
                controller: DeleteController,
                controllerAs: 'modal',
                resolve: {
                    id: () => id
                    
                },
                size: 'sm'
            }).result.then((selectedItem) => {
                this.listPairs.splice(index, 1);
            });
            
        }

        doAlert() {
            alert('Do alert');
        }

    }

    export class EditController {

        public ok() {
            this.$uibModalInstance.close({ english: this.english, target: this.target });
        }

        constructor(public english: string, public target: string,
            private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance) { }

    }

    export class EditTopicController {

        private updatedName;
        private originalName;

        public ok() {
            this.$uibModalInstance.close(this.updatedName);
            //this.updatedName
        }

        constructor(private originalTopic,
            private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance) {
            this.originalName = originalTopic;
            this.updatedName = originalTopic;
        }
    }

    export class DeleteTopicController {

        
        private originalName;
        private originalLingo;

        public ok() {
            this.$uibModalInstance.close();
            //this.updatedName
        }

        constructor(private originalTopic, private originalLanguage,
            private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance) {
            this.originalName = originalTopic;
            this.originalLingo = originalLanguage;
           
        }
    }
    export class DeleteController {

        public idNumber;

        public ok() {
            this.$http.delete(`/api/pairs/${this.idNumber}`);
            this.$uibModalInstance.close(this.idNumber);
        }

        constructor(public id: number,
            private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
            private $http: ng.IHttpService) {
            this.idNumber = id;
        }

    }

    export class SecretController {
        public secrets;

        constructor($http: ng.IHttpService) {
            $http.get('/api/secrets').then((results) => {
                this.secrets = results.data;
            });
        }
    }

    export class ParseController {
        private language;
        private topic;
        private textParse;
        private pairs = [];
        private listId;

        parse() {
            let words = this.textParse.split(/\s+/g);
            this.pairs = [];
            for (let i = 0; i < words.length; i+=2) {
                this.pairs.push(
                    { english: words[i] ,
                     target: words[i + 1] });
            }
        }
        flip() {

            for (let i = 0; i < this.pairs.length; i++) {
                let x = this.pairs[i].english;
                this.pairs[i].english = this.pairs[i].target;
                this.pairs[i].target = x;
            }

        }
        submit() {
            let listData = {
                language: this.language,
                topic: this.topic
            };

            this.$http.post('/api/lists', listData).then((results) => {
                this.listId = results.data;
            });
            for (let i = 0; i < this.pairs.length; i++) {
                let pairData = {
                    english: this.pairs[i].english,
                    target: this.pairs[i].target,
                    language: this.language,
                    topic: this.topic,
                    quizListId: this.listId
                }
                this.$http.post('/api/pairs', pairData);
            }
        }

        constructor(private $http: ng.IHttpService) {
            
        }

    }


    export class AboutController {
        public message = 'Hello from the about page!';
    }

    angular.module('IndividualProject4').controller('editController', EditController);
    angular.module('IndividualProject4').controller('editTopicController', EditTopicController);
    angular.module('IndividualProject4').controller('deleteTopicController', DeleteTopicController);
  //  angular.module('IndividualProject4').controller('deleteController', DeleteController);

}
