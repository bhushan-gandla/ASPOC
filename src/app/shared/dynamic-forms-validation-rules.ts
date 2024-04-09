

export const dynamicFormsValidationRules: { [key: string]: any } = {
    "GIHO": (formQuestions: any, questionId: any) => {
        const questionIdToBeRemoved = "GIGC";
        const sibilingQuestionToBeRemoved = "GIUPC";
        console.log(formQuestions);
        console.log(questionId);
        
        let index = formQuestions.findIndex((item: any) => item.questionId === questionIdToBeRemoved);
        // index++;
        if (index !== -1 && formQuestions[index+1].questionId === sibilingQuestionToBeRemoved) {
            formQuestions.splice(index+1, 1);
            // this.form.removeControl(questionId);
        }
    },
    "GIGC": (formQuestions: any, questionId: any) => {
        const parentQuestionIdToBeRemoved = "GIHO";
        const sibilingQuestionToBeRemoved = "GIUPC";
        console.log(formQuestions);
        console.log(questionId);
        
        let index = formQuestions.findIndex((item: any) => item.questionId === parentQuestionIdToBeRemoved);
        // index++;
        if (index !== -1 && formQuestions[index+1].questionId === sibilingQuestionToBeRemoved) {
            formQuestions.splice(index+1, 1);
            // this.form.removeControl(questionId);
        }
        // console.log(bookKeepingQuestions)
        // formQuestions.splice(0,1)

        // for(let key in bookKeepingQuestions){
        //     console.log(bookKeepingQuestions[key]);
        // }
    }
}