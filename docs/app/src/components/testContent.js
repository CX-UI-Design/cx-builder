export default {
  name: 'testContent',
  data() {
    return {
      title: 'test-title',
      content: 'testContent-testContent',
    }
  },
  render(h) {
    return (
      <div>
        <h2>{this.title}</h2>
        <span>{this.content}</span>
      </div>
    )
  },
}
