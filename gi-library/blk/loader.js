/**
 Original source: https://github.com/BiosNod/Live-data-loader.git

 🧡 Bring back some data for your game and have fun
 Our discord invite: https://discord.gg/MfxYRNdD9x

 🧡 Please make pull request to the original repository if you have {client, version, suffix} from other versions

 Don't forget to change versions.release.js
 */

const fs = require('fs')
const helpers = require("./helpers");

// You need to replace this link to real without stars
const mainUrl = "https://autopatchhk.yuanshen.com"

// You can change versions to some another list, like "./versions.beta" if you have beta list 👀
const versions = require('./versions.beta')

const paths =
    {
        res: {
            Mode: 'client_game_res',
            Clients: ['client/StandaloneWindows64'],
            Mappers: [
                'res_versions_external',
                'res_versions_medium',
                'res_versions_streaming',
                'release_res_versions_external',
                'release_res_versions_medium',
                'release_res_versions_streaming',
                'base_revision',
                'script_version',
                'AudioAssets/audio_versions',
            ]
        },

        clientSilence: {
            Mode: 'client_design_data',
            Clients: ['client_silence/General/AssetBundles'],
            Mappers: ['data_versions']
        },

        client: {
            Mode: 'client_design_data',
            Clients: ['client/General/AssetBundles'],
            Mappers: ['data_versions']
        },
    }

const resolvers =
    {
        AudioAssets: ['pck'],
        VideoAssets: ['cuepoint', 'usm'],
        AssetBundles: ['blk'],
    };

if (mainUrl.indexOf('*') > -1) {
    console.log("Please replace the mainUrl to real URL without stars (*)")
    return
}

(async () => {
    for (const [version, versionDatas] of Object.entries(versions.list))
        for (const versionData of versionDatas)
            for (const [liveType, liveData] of Object.entries(versionData)) {
                const pathData = paths[liveType]
                for (const client of pathData.Clients)
                    for (const mapper of pathData.Mappers) {
                        const fileFolder = `${pathData.Mode}/${version}/output_${liveData.Version}_${liveData.Suffix}/${client}`
                        const mapperUrl = `${mainUrl}/${fileFolder}/${mapper}`

                        const saveFileFolder = `${__dirname}/downloads/${fileFolder}`
                        const saveFilePath = `${saveFileFolder}/${mapper}`

                        await helpers.forceDownload(mapperUrl, saveFilePath)

                        // There are no JSON
                        if (['script_version', 'base_revision'].includes(mapper)) continue

                        const mapperLines = fs.readFileSync(saveFilePath).toString().split("\n")

                        for (const line of mapperLines) {
                            if (!line) continue

                            const mapperData = helpers.getMd5Data(line)

                            if (mapperData.remoteName === 'svc_catalog') continue

                            const ext = mapperData.remoteName.split('.').pop()
                            let extFolder = ''

                            for (const [resolveFolder, resolveExts] of Object.entries(resolvers))
                                if (resolveExts.includes(ext)) {
                                    extFolder = resolveFolder
                                    break
                                }

                            if (!extFolder)
                                console.log(`Can't detect extFolder for ext: ${ext}, remoteName: ${mapperData.remoteName}, it's OK but check it yourself. In the current case saving to the root folder instead of extFolder`)

                            if (extFolder && saveFileFolder.indexOf(extFolder) > -1)
                                extFolder = ''

                            const gameFileSavePath = `${saveFileFolder}/${extFolder}/${mapperData.remoteName}`
                            const gameFileUrl = `${mainUrl}/${fileFolder}/${extFolder}/${mapperData.remoteName}`.replace(`${fileFolder}//`, `${fileFolder}/`)

                            await helpers.forceDownload(gameFileUrl, gameFileSavePath)
                        }
                    }
            }

    console.log('Done ^_^')
})()