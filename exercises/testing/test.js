// write some tests
const {fixId} = require('./users')
describe('users', () => {
  test('fixid', ()=>{
      expect(fixId("200")).toBe(200)
  })
})
