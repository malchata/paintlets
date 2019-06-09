export default function (assets) {
  const assetManifest = {
    "legacy": JSON.parse(assets[0].toString()),
    "modern": JSON.parse(assets[1].toString())
  };

  return assetManifest;
}
