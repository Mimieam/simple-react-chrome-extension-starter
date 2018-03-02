import LZString from 'lz-string'

export const stringifyAndCompress = (Obj, verbose = false) => {
  const strData = JSON.stringify(Obj)
  const compressed = LZString.compress(strData)

  if (verbose) {
    console.log(strData)
    console.log(compressed)
  }
  console.log('Initial Size: ' + strData.length);
  console.log('Compressed Size: ' + compressed.length);
  return compressed
}

export const decompressAndParse = (compressedStr, verbose=false) => {
  const deCompressedStr = LZString.decompress(compressedStr)
  const parsedObj = JSON.parse(deCompressedStr)

  if (verbose) {
    console.log(deCompressedStr)
    console.log(parsedObj)
  }

  return parsedObj
}
