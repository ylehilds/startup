// Using "find()" returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.

exports.createQuiz = async function(data, quizzes) {
    const { question, quizTitle, quizId, user } = data
    quizzes[quizId] = quizzes[quizId] || { title: quizTitle, questions: [] , creatorId: user.id};
    quizzes[quizId].questions.push(question);
    return await quizzes[quizId]
}

exports.deleteQuestion = async function(data, quizzes) {
    const { question, quizTitle, quizId, user , questionText} = data
    let questions = quizzes[quizId].questions
    questions = questions.filter((question) => question.question !== questionText)
    quizzes[quizId].questions = questions
    return await quizzes[quizId]
}
