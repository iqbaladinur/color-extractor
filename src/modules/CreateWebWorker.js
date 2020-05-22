const createWebWorker = (fn) => {
  const blob = new Blob(['self.onmessage = ', fn.toString()], { type: 'text/javascript' });
  const blobUrl = URL.createObjectURL(blob);
  return new Worker(blobUrl);
};

export default createWebWorker;
