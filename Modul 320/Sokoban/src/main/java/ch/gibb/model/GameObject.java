package ch.gibb.model;


/**
 * The Gameobject which is used for each char in a level
 *
 * @author Maurice Däppen
 */
public class GameObject {

    /**
     * The Super constructor
     *
     * @param positionX the x coordinate of the field
     * @param positionY the x coordinate of the field
     * @param type      determines if the object is a box, player,wall or something else...
     */
    public GameObject(int positionX, int positionY, GameObjectType type) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.type = type;
    }


    /**
     * the x coordinate of the field
     */
    private int positionX;

    /**
     * the y coordinate of the field
     */
    private int positionY;

    /**
     * determines if the object is a box, player,wall or something else...
     */
    private final GameObjectType type;


    /**
     * set a new position of the field
     *
     * @param x the new x coordinate of the field
     * @param y the new y coordinate of the field
     */
    public void setPosition(int x, int y) {
        positionX = x;
        positionY = y;
    }

    /**
     * returns the actual position
     *
     * @return the actual position as array
     */
    public int[] getPosition() {
        return new int[]{positionX, positionY};
    }

    /**
     * returns the type ob the field
     *
     * @return the type of the field
     */
    public GameObjectType getType() {
        return type;
    }

    /**
     * returns the actual x coordinate
     *
     * @return the x coordinate
     */
    public int getPositionX() {
        return positionX;
    }

    /**
     * returns the actual y coordinate
     *
     * @return the y coordinate
     */
    public int getPositionY() {
        return positionY;
    }
}
