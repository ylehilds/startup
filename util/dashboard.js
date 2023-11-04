// Using "find()" returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.

exports.deleteQuiz = async function(quizId, quizzes) {
    delete quizzes[quizId]
    return await quizzes
}
