namespace IndividualProject4.Services {

    export class GlobalService {
        private language;
        private topic;

        constructor() {
            this.language = "Spanish";
        }

        CurrentLanguage() {
           return localStorage.getItem("Language");
//            return this.language;
        }
        SetLanguage(l) {
            this.language = l;
            localStorage.setItem("Language", l);
        }
        CurrentTopic() {
            return localStorage.getItem("Topic");
//            return this.topic;
        }
        SetTopic(t) {
            this.topic = t;
            localStorage.setItem("Topic", t);
        }
    }

    angular.module('IndividualProject4').service('globalService', GlobalService);

}
