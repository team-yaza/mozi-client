self.addEventListener('fetch', (event) => {
  console.log('in home: ', event.request.url);
});
