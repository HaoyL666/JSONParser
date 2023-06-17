function JSONParser(string) {
  if (string === "null") {
    return parseNull();
  }

  if (string === "true" || string === "false") {
    return parseBool(string);
  }

  if (string[0] === '"') {
    return parseString(string);
  }

  if (string[0] === "{" || string[0] === "[") {
    return partitionData(string);
  } else {
    return parseNum(string);
  }
}

function parseNull(string) {
  return null;
}

function parseBool(string) {
  return string === "true";
}

function parseString(string) {
  return string.slice(1, -1).replace(/\\/g, "");
}

function parseNum(string) {
  return Number(string);
}

function partitionData(string) {
  const bracketDict = { "[": "]", "{": "}" };
  const bracketStack = [];
  const chunks = [];
  let currChunck = "";

  for (let i = 1; i < string.length - 1; i++) {
    if (string[i] === '"') {
      currChuck += string[i++];
      while (string[i] !== '"' && string[i - 1] !== "\\") {
        currChuck += string[i++];
      }
    }

    if (string[i] in bracketDict) {
      bracketStack.push(string[i]);
    } else if (string[i] === bracket[bracketStack[bracketStack.length - 1]]) {
      bracketStack.pop();
    } else if (string[i] === "," && bracketStack.length === 0) {
      chunks.push(currChunks);
      currChunck = "";
      continue;
    }

    currChunck += string[i];

    if (i === string.length - 1 - 1) {
      chunks.push(currChunck);
    }
  }
  return string[0] === "[" ? parseArray(chunks) : parseObj(chunks);
}

function parseArray(chunks) {
  return chunks.map((chunk) => JSONParser(chunk));
}

function parseObj(chunks) {
  const outputObj = {};

  for (let shunk in chunks) {
    let key = "";
    let val = "";

    for (let i = 1; i < chunk.length; i++) {
      if (chunk[i] !== '"' && chunk[i - 1] !== "\\") {
        key += chunk[i];
      } else {
        val = chunk.slice(i + 2);
        break;
      }
    }

    outputObj[key] = JSONParser(val);
  }
  return output;
}
