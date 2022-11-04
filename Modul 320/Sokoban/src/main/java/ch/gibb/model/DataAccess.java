package ch.gibb.model;

import java.io.*;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

/**
 * This class is used to access the Data e.g. Levels
 *
 * @author Maurice DÃ¤ppen
 */
public class DataAccess {

    /**
     * All levels which will be loaded
     */
    private List<Level> levels = new ArrayList<>();

    /**
     * This method loads all Levels and creates an array ob Objects
     * @throws URISyntaxException
     * @throws IOException
     */
    public void loadLevels() throws URISyntaxException, IOException {
        List<String> fileNames = getResourceFiles();
        for (String fileName : fileNames) {
            List<String> lines;
            ClassLoader classLoader = getClass().getClassLoader();
            URL resource = classLoader.getResource("levels/" + fileName);
            assert resource != null;
            File file = new File(resource.toURI());
            lines = Files.readAllLines(file.toPath());
            int levelWidth = 0;
            validateLevel(lines, fileName);
            for (String line : lines) {
                if (line.length() > levelWidth) {
                    levelWidth = line.length();
                }
            }
            GameObject[][] newLevelAtStart = new GameObject[lines.size()][levelWidth];
            GameObject[][] newLevelOnlyMovableObjects = new GameObject[lines.size()][levelWidth];

            int lineCounter = 0;
            for (String line : lines) {
                int charCounter = 0;
                for (char character : line.toCharArray()) {
                    StandableGameObject newGameObject;
                    MovableGameObject newMovableGameObject;
                    switch (character) {
                        case '#' -> {
                            newGameObject = new StandableGameObject(charCounter, lineCounter, GameObjectType.BORDER);
                        }
                        case '@' -> {
                            newGameObject = new StandableGameObject(charCounter, lineCounter, GameObjectType.CLEAR);
                            newMovableGameObject = new MovableGameObject(charCounter, lineCounter, GameObjectType.PLAYER);
                            newLevelOnlyMovableObjects[lineCounter][charCounter] = newMovableGameObject;

                        }
                        case '$' -> {
                            newGameObject = new StandableGameObject(charCounter, lineCounter, GameObjectType.CLEAR);
                            newMovableGameObject = new MovableGameObject(charCounter, lineCounter, GameObjectType.BOX);
                            newLevelOnlyMovableObjects[lineCounter][charCounter] = newMovableGameObject;
                        }
                        case '.' -> {
                            newGameObject = new StandableGameObject(charCounter, lineCounter, GameObjectType.ENDPOINT);
                        }
                        case '*' -> {
                            newGameObject = new StandableGameObject(charCounter, lineCounter, GameObjectType.ENDPOINT);
                            newMovableGameObject = new MovableGameObject(charCounter, lineCounter, GameObjectType.BOX);
                            newLevelOnlyMovableObjects[lineCounter][charCounter] = newMovableGameObject;
                        }
                        case '+' -> {
                            newGameObject = new StandableGameObject(charCounter, lineCounter, GameObjectType.ENDPOINT);
                            newMovableGameObject = new MovableGameObject(charCounter, lineCounter, GameObjectType.PLAYER);
                            newLevelOnlyMovableObjects[lineCounter][charCounter] = newMovableGameObject;

                        }
                        default -> {
                            newGameObject = new StandableGameObject(charCounter, lineCounter, GameObjectType.CLEAR);


                        }
                    }
                    newLevelAtStart[lineCounter][charCounter] = newGameObject;
                    charCounter++;

                }
                while (charCounter < levelWidth) {
                    StandableGameObject newGameObject = new StandableGameObject(charCounter, lineCounter, GameObjectType.BORDER);
                    newLevelAtStart[lineCounter][charCounter] = newGameObject;
                    charCounter++;
                }
                lineCounter++;


            }
            Level newLevel = new Level(newLevelAtStart, newLevelOnlyMovableObjects);
            levels.add(newLevel);

        }
    }


    /**
     * Returns all loaded levels
     *
     * @return all the levels
     */
    public List<Level> getLevels() {
        return levels;
    }

    /**
     * Validates a Level
     *
     * @param level the level which will be validated
     * @param levelName the name of the level which will be validated
     */
    private void validateLevel(List<String> level, String levelName) {
        boolean isRightestCharWall = true;
        boolean hasPlayer = false;
        int indexOfRightestChar = 0;
        int boxes = 0;
        int endpoints = 0;
        for (String line : level) {
            for (char character : line.replace(" ", "").toCharArray()) {
                switch (character) {
                    case '#' -> {
                    }
                    case '$' -> {
                        boxes++;
                    }
                    case '.' -> {
                        endpoints++;
                    }
                    case '*' -> {
                        boxes++;
                        endpoints++;
                    }

                    case '@' -> {
                        if (!hasPlayer) {
                            hasPlayer = true;
                        } else {
                            throw new IllegalStateException(levelName + ": More than one Player is not allowed!");
                        }
                    }
                    case '+' -> {
                        if (!hasPlayer) {
                            hasPlayer = true;
                        } else {
                            throw new IllegalStateException(levelName + ": More than one Player is not allowed!");
                        }
                        endpoints++;
                    }
                    default -> {
                        throw new IllegalStateException(levelName + ": Invalid characters in a Level");
                    }
                }
            }
            if (line.charAt(0) != '#') {
                throw new IllegalStateException(levelName + ": Left column must be a Wall!");
            }
            if (line.length() >= indexOfRightestChar) {
                if (line.charAt(line.length() - 1) == '#' && indexOfRightestChar < line.length()) {
                    isRightestCharWall = true;
                }
                if (line.charAt(line.length() - 1) != '#') {
                    isRightestCharWall = false;
                }
                indexOfRightestChar = line.length();

            }
        }
        if (!hasPlayer) {
            throw new IllegalStateException(levelName + ": Player is required!");
        }
        if (endpoints != boxes) {
            throw new IllegalStateException(levelName + ": It must have as many boxes as endpoints!");
        }
        if (!isRightestCharWall) {
            throw new IllegalStateException(levelName + ": The Rightest Column has to be a Wall!");
        }
        for (char character : level.get(0).toCharArray()) {
            if (character != '#') {
                throw new IllegalStateException(levelName + ": The First row must be Wall!");
            }
        }
        for (char character : level.get(level.size() - 1).toCharArray()) {
            if (character != '#') {
                throw new IllegalStateException(levelName + ": The Last row must be Wall!");
            }
        }

    }

    /**
     * Gets all filenames as Strings
     *
     * @return a list of all filenames of the levels as List of strings
     */
    //idea from https://stackoverflow.com/questions/3923129/get-a-list-of-resources-from-classpath-directory
    private List<String> getResourceFiles() throws IOException {
        List<String> filenames = new ArrayList<>();

        try (
                InputStream in = getResourceAsStream();
                BufferedReader br = new BufferedReader(new InputStreamReader(in))) {
            String resource;

            while ((resource = br.readLine()) != null) {
                filenames.add(resource);
            }
        }

        return filenames;
    }

    /**
     * Gets all filenames as input Stream
     *
     * @return a list of all filenames of the levels as stream
     */
    private InputStream getResourceAsStream() {
        final InputStream in
                = getContextClassLoader().getResourceAsStream("levels/");

        return in == null ? getClass().getResourceAsStream("levels/") : in;
    }

    /**
     * returns the classLoader
     *
     * @return classLoader
     */
    private ClassLoader getContextClassLoader() {
        return Thread.currentThread().getContextClassLoader();
    }

}