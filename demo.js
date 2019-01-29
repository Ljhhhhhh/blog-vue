const a = [
  {name: 'ljh', age: 24, sex: 1},
  {name: 'jld', age: 23, sex: 2},
  {name: 'ljxsh', age: 23, sex: 1},
  {name: 'ljdsh', age: 24, sex: 2},
]

const sexs = [{value: 1, name: '男'}, {value: 2, name: '女'}];

sexs.forEach(sex => {
  sex.list = a.filter(v => {
    return v.sex === sex.value
  })
})

console.log('sexs:', sexs[0].list)