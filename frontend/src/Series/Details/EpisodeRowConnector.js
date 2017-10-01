/* eslint max-params: 0 */
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createSeriesSelector from 'Store/Selectors/createSeriesSelector';
import createEpisodeFileSelector from 'Store/Selectors/createEpisodeFileSelector';
import createCommandsSelector from 'Store/Selectors/createCommandsSelector';
import EpisodeRow from './EpisodeRow';

function createMapStateToProps() {
  return createSelector(
    (state, { id }) => id,
    (state, { seasonNumber }) => seasonNumber,
    (state, { sceneSeasonNumber }) => sceneSeasonNumber,
    createSeriesSelector(),
    createEpisodeFileSelector(),
    createCommandsSelector(),
    (id, seasonNumber, sceneSeasonNumber, series, episodeFile, commands) => {
      const alternateTitles = series.alternateTitles.filter((alternateTitle) => {
        if (sceneSeasonNumber && sceneSeasonNumber === alternateTitle.sceneSeasonNumber) {
          return true;
        }

        return seasonNumber === alternateTitle.seasonNumber;
      });

      return {
        seriesMonitored: series.monitored,
        seriesType: series.seriesType,
        episodeFilePath: episodeFile ? episodeFile.path : null,
        episodeFileRelativePath: episodeFile ? episodeFile.relativePath : null,
        alternateTitles
      };
    }
  );
}
export default connect(createMapStateToProps)(EpisodeRow);