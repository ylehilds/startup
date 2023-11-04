// Using "find()" returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.

exports.editQuiz = async function(data, quizId, quizzes) {
    const { quiz } = data
    quizzes[quizId] = quiz
    return await quizzes[quizId]
}
