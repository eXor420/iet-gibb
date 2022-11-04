package ch.gibb.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.net.URISyntaxException;

import static org.junit.jupiter.api.Assertions.*;

class DataAccessTest {

    DataAccess dataAccess;
    String testLevel;

    @BeforeEach
    void init() {
        dataAccess = new DataAccess();
        testLevel = "##########\n" +
                "##########\n" +
                "#######  #\n" +
                "### .# #.#\n" +
                "#     .  #\n" +
                "# #  $ $ #\n" +
                "# #####  #\n" +
                "##### $$.#\n" +
                "### @    #\n" +
                "##########";
    }

    @Test
    void loadLevels() throws URISyntaxException, IOException {
        dataAccess.loadLevels();
        assertEquals(dataAccess.getLevels().get(0).toString(), testLevel);
    }
}