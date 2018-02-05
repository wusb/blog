export default {
  getIssues(data){
    return this.http('github', 'post', '/graphql', data)
  }
}